"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ----------------------------------------
// Database Connection
// ----------------------------------------
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "rootpassword",
    database: process.env.DB_NAME || "postsdb",
    waitForConnections: true,
    connectionLimit: 10,
});
// ----------------------------------------
// Initialize Database Schema
// ----------------------------------------
async function initDb() {
    await pool.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      topic VARCHAR(255) NOT NULL,
      data TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}
// ----------------------------------------
// Helper: Consistent JSON Errors
// ----------------------------------------
function jsonError(res, status, error, message) {
    return res.status(status).json({ error, message });
}
// ----------------------------------------
// GET /api/health
// ----------------------------------------
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});
// ----------------------------------------
// GET /api/posts
// Pagination, search, sorting
// ----------------------------------------
app.get("/api/posts", async (req, res) => {
    try {
        let limit = Number(req.query.limit) || 20;
        let offset = Number(req.query.offset) || 0;
        const q = req.query.q || "";
        const sort = req.query.sort || "created_desc";
        if (limit > 100)
            limit = 100;
        let orderBy = "created_at DESC, id DESC";
        if (sort === "created_asc") {
            orderBy = "created_at ASC, id ASC";
        }
        const searchSql = q ? "WHERE topic LIKE ? OR data LIKE ?" : "";
        const searchParams = q ? [`%${q}%`, `%${q}%`] : [];
        const [totalRows] = await pool.query(`SELECT COUNT(*) AS total FROM posts ${searchSql}`, searchParams);
        if (!totalRows || totalRows.length === 0) {
            return jsonError(res, 500, "ServerError", "Failed to count posts");
        }
        const total = Number(totalRows[0].total);
        const [rows] = await pool.query(`
      SELECT id, topic, data, created_at, updated_at
      FROM posts
      ${searchSql}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `, [...searchParams, limit, offset]);
        res.json({
            meta: {
                limit,
                offset,
                count: rows.length,
                total,
                sort,
                q,
            },
            posts: rows,
        });
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to load posts");
    }
});
// ----------------------------------------
// POST /api/posts
// Create new post
// ----------------------------------------
app.post("/api/posts", async (req, res) => {
    var _a;
    try {
        const { topic, data } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if (!topic || typeof topic !== "string" || topic.trim() === "") {
            return jsonError(res, 400, "BadRequest", "topic is required");
        }
        if (!data || typeof data !== "string" || data.trim() === "") {
            return jsonError(res, 400, "BadRequest", "data is required");
        }
        const cleanTopic = topic.trim();
        const cleanData = data.trim();
        const [result] = await pool.execute(`INSERT INTO posts (topic, data) VALUES (?, ?)`, [cleanTopic, cleanData]);
        const insertId = result.insertId;
        const [rows] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [insertId]);
        if (!rows || rows.length === 0) {
            return jsonError(res, 500, "ServerError", "Failed to fetch created post");
        }
        res.status(201).json(rows[0]);
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to create post");
    }
});
// ----------------------------------------
// GET /api/posts/:id
// ----------------------------------------
app.get("/api/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return jsonError(res, 400, "BadRequest", "id must be an integer");
    }
    try {
        const [rows] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!rows || rows.length === 0) {
            return jsonError(res, 404, "NotFound", "post not found");
        }
        res.json(rows[0]);
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to fetch post");
    }
});
// ----------------------------------------
// PUT /api/posts/:id
// Replace entire post
// ----------------------------------------
app.put("/api/posts/:id", async (req, res) => {
    var _a;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return jsonError(res, 400, "BadRequest", "id must be an integer");
    }
    const { topic, data } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
    if (!topic || typeof topic !== "string" || topic.trim() === "") {
        return jsonError(res, 400, "BadRequest", "topic is required");
    }
    if (!data || typeof data !== "string" || data.trim() === "") {
        return jsonError(res, 400, "BadRequest", "data is required");
    }
    try {
        const [existing] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!existing || existing.length === 0) {
            return jsonError(res, 404, "NotFound", "post not found");
        }
        await pool.execute(`UPDATE posts SET topic = ?, data = ? WHERE id = ?`, [topic.trim(), data.trim(), id]);
        const [updated] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!updated || updated.length === 0) {
            return jsonError(res, 500, "ServerError", "Failed to fetch updated post");
        }
        res.json(updated[0]);
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to update post");
    }
});
// ----------------------------------------
// PATCH /api/posts/:id
// Partial update
// ----------------------------------------
app.patch("/api/posts/:id", async (req, res) => {
    var _a;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return jsonError(res, 400, "BadRequest", "id must be an integer");
    }
    const { topic, data } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
    if (!topic && !data) {
        return jsonError(res, 400, "BadRequest", "topic or data required");
    }
    if (topic !== undefined && topic.trim() === "") {
        return jsonError(res, 400, "BadRequest", "topic cannot be empty");
    }
    if (data !== undefined && data.trim() === "") {
        return jsonError(res, 400, "BadRequest", "data cannot be empty");
    }
    try {
        const [existing] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!existing || existing.length === 0) {
            return jsonError(res, 404, "NotFound", "post not found");
        }
        const current = existing[0];
        const newTopic = topic !== undefined ? topic.trim() : current.topic;
        const newData = data !== undefined ? data.trim() : current.data;
        await pool.execute(`UPDATE posts SET topic = ?, data = ? WHERE id = ?`, [newTopic, newData, id]);
        const [updated] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!updated || updated.length === 0) {
            return jsonError(res, 500, "ServerError", "Failed to fetch updated post");
        }
        res.json(updated[0]);
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to update post");
    }
});
// ----------------------------------------
// DELETE /api/posts/:id
// ----------------------------------------
app.delete("/api/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return jsonError(res, 400, "BadRequest", "id must be an integer");
    }
    try {
        const [existing] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (!existing || existing.length === 0) {
            return jsonError(res, 404, "NotFound", "post not found");
        }
        await pool.execute(`DELETE FROM posts WHERE id = ?`, [id]);
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        jsonError(res, 500, "ServerError", "Failed to delete post");
    }
});
// ----------------------------------------
// Start Server
// ----------------------------------------
initDb()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to initialize database:", err);
});

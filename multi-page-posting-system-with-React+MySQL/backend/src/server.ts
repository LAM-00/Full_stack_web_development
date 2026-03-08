// Setup instructions:
// 1) Initialize Node project:
//    npm init -y
// 2) Install runtime deps:
//    npm install express
// 3) Install TypeScript tooling + types:
//    npm install -D typescript ts-node @types/node @types/express
// 3b) If you need CORS:
//    npm install cors
//    npm install -D @types/cors
// 4) Create tsconfig:
//    npx tsc --init
// 5) type = module
//    npx npm pkg set type=module
// 6) Run the server:
//    npx ts-node server.ts
//    (or) node --loader ts-node/esm server.ts

import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// GET posts:  curl http://localhost:81/posts
// POST posts: curl -X POST http://localhost:81/posts -H "Content-Type: application/json" -d '{"text":"hello","timestamp":"2026-02-01T12:00:00.000Z"}'

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// CORS note: With cors() on a route, browsers will allow any origin to call it
// (Access-Control-Allow-Origin: *). Non-browser clients were already allowed;
// CORS only affects browser cross-origin requests.

const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: "rootpassword",
  database: "appdb",
  waitForConnections: true,
  connectionLimit: 10,
});



// New function
async function waitForDb() {
  let connected = false;

  while (!connected) {
    try {
      await pool.query("SELECT 1");
      connected = true;
      console.log("Database is ready.");
    } catch {
      console.log("Waiting for database...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}




const initDb = () => {
  return new Promise<void>((resolve, reject) => {
    pool
      .execute(
        `CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          text VARCHAR(500) NOT NULL,
          timestamp VARCHAR(100) NOT NULL
        )`
      )
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

// CORS note: With cors() on a route, browsers will allow any origin to call it
// (Access-Control-Allow-Origin: *). Non-browser clients were already allowed;
// CORS only affects browser cross-origin requests.



// GET /api/posts
app.get("/api/posts", (_req, res) => {
  pool
    .query("SELECT id, text AS topic, timestamp, text AS data FROM posts ORDER BY id DESC")
    .then(([rows]) => res.json(rows))
    .catch(() => res.status(500).json({ error: "Failed to load posts." }));
});

// POST /api/posts
app.post("/api/posts", (req, res) => {
  const { topic, data } = req.body ?? {};

  if (typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "topic is required." });
  }

  if (typeof data !== "string" || data.trim().length === 0) {
    return res.status(400).json({ error: "data is required." });
  }

  const timestamp = new Date().toISOString();

  pool
    .execute(
      "INSERT INTO posts (text, timestamp) VALUES (?, ?)",
      [data.trim(), timestamp]
    )
    .then(([result]: any) => {
      const id = result.insertId;
      res.status(201).json({ id, topic, data, timestamp });
    })
    .catch(() => res.status(500).json({ error: "Failed to write post." }));
});


/// newly added : wait for DB, init table
waitForDb()
  .then(() => initDb())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
  });





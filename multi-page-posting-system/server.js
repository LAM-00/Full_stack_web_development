// server.js
// assignment - 03

const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
app.use(express.json());
app.use(express.static("public"));


// ----------------
// Storage setup
// ----------------

const DATA_FILE = path.join(__dirname, "data", "posts.json");


function loadPosts()
{
    try
    {
        const raw = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(raw);
    }
    catch (err)
    {
        console.log("Posts.json missing or invalid, starting with empty list.");
        return [];
    }
}

function savePosts(posts)
{
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}




let posts = loadPosts();

// -----------------------------
// GET /api/posts 
// ----------------------------- 
app.get("/api/posts", (req, res) => 
    {
        res.json(posts); 
    });



// ----------------------------- 
// POST /api/posts 
// -----------------------------

app.post("/api/posts", (req, res) => 
    {
        const { topic, data } = req.body; 
        
        if (!topic || !data) { return res.status(400).json({ error: "topic and data are required" }); } 
        const newPost = 
        {
            topic, data, timestamp: new Date().toISOString()
        };
        
        posts.push(newPost);
        savePosts(posts);
        
        res.json({ message: "Post created", post: newPost });
    });

// ----------------------------- 
// Start server 
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => 
    {
        console.log(`Server running on port http://localhost:3000/index.html`); 
    });
// server.js
// assignment 2

'use strict';
const express = require("express");
const { error } = require("node:console");
const app = express();
const PORT = 3000;

// Allow Json body parsing
app.use(express.json());
app.use(express.static(__dirname));
// app.use('/web', express.static('pages')) [from lecture slides]


// NEW: Serve posting.html at the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/posting.html");
});

// In-memory storage for posts
let posts = [];


// POST /postmessage
app.post("/postmessage", (req, res) =>
{
    const {topic , data} = req.body;

    if ( !topic || !data )
    {
        return res.status(400).json({error:"Topic and data are required"});
    }
    const timestamp = new Date().toLocaleString();
    const newPost = {topic, data, timestamp};
    posts.push(newPost);

    res.json({message: "Post added successfully", post: newPost});
});



// GET /posts
app.get("/posts", (req, res) => 
{
    res.json(posts);
});


// Start Sever
app.listen(PORT, () => 
{
    console.log("Server running on http://localhost:3000")
});



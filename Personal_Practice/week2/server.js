/**
 * Mini exercise
 * Add a new route: GET /hello that returns “Hello!”
 * Add GET /count that returns the current count as JSON 
 * Bonus: add /reset to set count back to 0
*/

const express = require("express");
const app = express();

let count = 0;

// Home route
app.get("/", (req, res) => {
  count++;
  res.send("This server has handled " + count + " requests");
});

// /hello route
app.get("/hello", (req, res) => {
  res.send("Hello!");
});

// /count route (returns JSON)
app.get("/count", (req, res) => {
  res.json({ count });
});

// /reset route
app.get("/reset", (req, res) => {
  count = 0;
  res.send("Count reset to 0");
});

app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});

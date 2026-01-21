// express-count.js
// Server state: count invocations
// Goal: Understand in‑memory state and 
// how it changes per request.

const express = require('express');
const app = express();


// state in memory (per process)
let count = 0;

app.get('/',(req, res) =>
{
    count++ ;
    res.send('This server has handled ' + count + ' requests');

});

app.listen(3002, () =>
{
    console.log('Listening on http://localhost:3002')
})

/***
 * count lives in memory as long as the process is running.
 * Restarting the server resets count to 0.
 * Each process has its own copy of count.
 * State (important note)
 *  This counter resets when you restart the server
 * If you run multiple server processes, each one has its own count
 * For “real” shared state, you usually store data in a database
 * */
// express-hello.js
// You already have Express installed in this folder.
// Goal: Feel how Express makes this easier.

const express = require('express')
const app = express();

app.get('/', (req, res) => 
{
    res.send('Hello from EXPRESS!!')
});

app.listen(3002, ()=>
{
    console.log('Listening on http://localhost:3002');
});

/**
 * What you just learned:
 * app.get('/', handler) is a route.
 * res.send() handles headers + body for you.
 * 
*/
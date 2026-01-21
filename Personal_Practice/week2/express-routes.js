// express-routes.js
// Express routes (multiple paths)
// Goal: Compare this to the plain http version.

const express = require('express');
const app = express();

app.get('/', (req, res) =>
{
    res.send('HOME');
})
app.get('/about', (req, res) =>
{
    res.send('ABOUT');
})
app.get('/api/time', (req, res) => 
{
    res.json({ now: Date.now() });
});

app.listen(3002, () =>
{
    console.log('Listening on http://localhost:3002');
});


/**
 * Express gives you res.send() and res.json().
 * No manual if (req.url === ...) needed.
 * 
*/
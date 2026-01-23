// basic-http.js
// Most basic HTTP server (built‑in http)
// Goal: Understand what 
// “listening on a port” means.


const http = require('http');

const server = http.createServer((req, res) =>
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, world from basic-http server !!\n');
    });


server.listen(3002, () =>
    {
        console.log('Listening on http://localhost:3002');
    });

/**
 * learned:
 * http.createServer() -> creates a server.
 * server.listen(3000) -> makes it listen on port 3000.
 * The callback (req, res) => { ... } runs on every request. 
 * */ 
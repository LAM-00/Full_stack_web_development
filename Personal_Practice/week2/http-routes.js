// http-routes.js
// Different paths with plain http (no Express)
// Goal: See how routing works manually.



const http = require('http')

http.createServer(
    (req, res) =>
    {if (req.url == '/')
    {
        res.end('HOME');
    }
    else if (req.url == '/about')
    {
        res.end('ABOUT');
    }
    else if (req.url == '/api/time')
    {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ now: Date.now()}));
    }
    else
    {
        res.statusCode = 404;
        res.end('NOT FOUND');
    }
    }
    ).listen(3002,() => 
    {
        console.log('Listening on http://localhost:3002');
    });



/*
 * Try in browser:
 * http://localhost:3000/ → Home
 * http://localhost:3000/about → About
 * http://localhost:3000/api/time → JSON
 * http://localhost:3000/xyz → Not found
 
 * What you just learned:
 * req.url tells you which path was requested.
 * You manually check it with if/else.
 * You set headers and status codes yourself. 
 */
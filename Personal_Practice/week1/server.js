/**
 * Version with named handler functions
 * This version breaks the logic into separate functions
 * this one is clean separation of concerns
 * Each route has its own function
 * Easier to test and maintain
 * Same behavior as before
*/




// This tells JavaScript:
// be stricter 
// catch more errors
// prevent accidental global variables
// enforce cleaner syntax
'use strict';

var express = require('express');
// App
var app = express();

// Constants
// const PORT = process.env.PORT || 3002;
// const HOST = '0.0.0.0';



// Handler for '/' HOME
function handleRootRequest(req, res)
{
  console.log(req.originalUrl);
  res.send('hello world!');
}


// Handler for '/hello' 
function handleHelloRequest(req, res)
{
  console.log(req.originalUrl);
  res.send('hello!');
}

// Handler for file server
function serveStaticFiles(req, res, next)
{
  express.static('pages')(req, res, next);
}


// routing 
app.get('/', handleRootRequest);
app.get('/hello', handleHelloRequest);
app.get('/web', serveStaticFiles);


// start server
function startServer()
{
  console.log('Server listening on port http://localhost:3002');
}
app.listen(3002, startServer);
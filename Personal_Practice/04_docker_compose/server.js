'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 3002;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/welcome', (req, res) => {
  res.send('Welcome to CMPT 353 Tutorials, This is part 04_docker_compose!!!');
});

app.get('/', (req, resp) => { console.log(req.originalUrl); resp.send('hello world to 04_docker_compose'); });
app.get('/hello', (req, resp) => { console.log(req.originalUrl); resp.send('hello, 04_docker_compose'); });

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
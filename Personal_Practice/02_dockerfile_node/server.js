'use strict';

// Constants
const express = require('express');



const PORT = process.env.PORT || 3002;
const HOST = '0.0.0.0';

//App
const app = express();

app.get('/', (req, resp) => {
  console.log(req.originalUrl);
  resp.send('Welcome Home, This is from cmpt_353');
});

app.get('/hello', (req, resp) => {
  console.log(req.originalUrl);
  resp.send('hello there, How is gonin?');
});

app.use('/web', express.static('pages'));

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

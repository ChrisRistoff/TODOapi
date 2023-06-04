const express = require('express');

// instantiate express
const app = express();

// define a server port
const port = 3000;

// create a default route
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// listen to incoming requests
app.listen(port);

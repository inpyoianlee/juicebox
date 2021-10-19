const PORT = 3000;
const express = require('express');
const server = express();
const { client } = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

server.get('/api', (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});

server.use('/api', (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});


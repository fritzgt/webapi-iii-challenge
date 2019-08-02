const express = require('express');

//importing CRUD module for users
const userRouter = require('./users/userRouter');

//importing CRUD module for post
// const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.use(logger);

server.use('/users', userRouter);

// server.use('/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  //Console log Request method, url, timestamp
  console.log(`Request method: ${req.method}`);
  console.log(`Request url: ${req.url}`);
  console.log(`Request timestamp: ${Date()}`);
  next();
}

module.exports = server;

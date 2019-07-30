const express = require('express');

const server = express();

//importing CRUD module for users
const userRouter = require('./users/userRouter');
server.use('/users', userRouter);

//importing CRUD module for post
const postRouter = require('./posts/postRouter');
// server.use('/users/:id/post', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;

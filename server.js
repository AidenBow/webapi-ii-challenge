const express = require('express');
const PostsRouter = require('./Posts/PostsRouter');
const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`
    <p>Welcome to the API</p>
  `);
});

module.exports = server
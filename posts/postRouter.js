const express = require('express');

const router = express.Router();

//importing db
const db = require('./postDb');

router.post('/:id/posts', (req, res) => {
  const newPost = req.body;
  const { text } = newPost;
  console.log('Object from post', newPost);
  db.insert(newPost)
    .then(post => {
      if (!post_id) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch(err => {
      if (!text) {
        res.status(404).json({
          errorMessage: 'Please provide name for the new user.'
        });
      } else {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      }
    });
});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
    .then(post => {
      if (!post) {
        res
          .status(400)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;

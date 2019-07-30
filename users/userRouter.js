const express = require('express');

const router = express.Router();

//importing db
const db = require('./userDb');

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  db.get().then(user => {
    res
      .status(400)
      .json({ user })
      .catch(err => {
        res.status(500).json({ err });
      });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      if (!user) {
        res
          .status(400)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

router.get('/:id/posts', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;

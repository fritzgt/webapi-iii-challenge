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

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;

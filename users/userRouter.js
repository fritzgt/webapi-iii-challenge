const express = require('express');

const router = express.Router();

//importing databases
const db = require('./userDb');

const dbPost = require('../posts/postDb');

//Requests section
//create new user with custom middleware
router.post('/', validateUser, (req, res) => {
  const newUser = req.body;
  const { name } = newUser;
  db.insert(newUser)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      if (!name) {
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

//this should be done on the postRouter instead
router.post('/:id/posts', (req, res) => {
  const newPost = req.body;
  const { text, user_id } = newPost;
  //   console.log('Object from post', newPost);
  dbPost
    .insert(newPost)
    .then(post => {
      if (!'${post}') {
      } else {
        res.status(200).json({ post });
      }
    })
    .catch(err => {
      if (!user_id) {
        res.status(404).json({
          message: 'Please provide an ID for the new comment.'
        });
      } else if (!text) {
        res.status(404).json({
          errorMessage: 'Please provide text for the new comment.'
        });
      } else {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      }
    });
});

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

router.get('/:id', validateUserId, (req, res) => {
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

//this should be done on the postRouter instead with custom middleware
router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
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
        .json({ error: 'The post information could not be retrieved.' });
    });
});
//Delete with custom middleware
router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const { name } = newData;
  db.update(id, newData)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch(err => {
      if (!name) {
        res.status(400).json({
          errorMessage: 'Please provide nameto update user.'
        });
      } else {
        res.status(500).json({
          error: 'The post information could not be modified.'
        });
      }
    });
});

//custom middleware

//async function
//by using the method getById is enough because if the user does not exist
//it will validate to false on all request by id
async function validateUserId(req, res, next) {
  try {
    // console.log('Hello');
    // next();
    // set id to a variable if one is available
    const { id } = req.params;
    const user = await db.getById(id);
    if (user) {
      //store user object
      req.user = user;
      // console.log('Middleware validateUserId successful');
      next();
    } else {
      // console.log('Middleware validation: invalid user id');
      res.status(400).json({
        message: 'invalid user id'
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
//validates the `body` on a request to create a new user
function validateUser(req, res, next) {
  // console.log('validateUser', req.body);
  // next();
  try {
    const body = req.body;
    const { name } = body;
    // const user = await db.insert(name);
    if (!`${body}`) {
      console.log('Middleware validation: missing user data');
      res.status(400).json({
        message: 'missing user data'
      });
    } else if (!name) {
      console.log('Middleware validation: missing user name');
      res.status(400).json({
        message: 'missing required name field'
      });
    } else {
      console.log('Middleware validateUser successful');
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

function validatePost(req, res, next) {}

module.exports = router;

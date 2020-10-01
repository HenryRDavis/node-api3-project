const express = require('express');
const Users = require('./userDb');
const server = require('../server');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert()
  .then(posts => {
    res.status(201).json(posts)
  })
  .catch( err => {
    res.status(500).json({message: 'Error adding posts'})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({message: 'Error adding post'})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot retrieve users'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const Id = (req.params.id)
  Users.getById(Id)
  .then(userid => {
    res.status(200).json(userid)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot retrieve user id'})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const UserPosts = (req.params.id)
  Users.getUserPosts(UserPosts)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot retrieve user post'})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const Id = (req.params.id)
  Users.remove(Id)
  .then(dead => {
    res.status(200).json(dead)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot delete user'})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(doodle => {
    if(doodle) {
      res.status(200).json(doodle);
    } else {
      res.status(404).json({message: 'The user could not be found'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'The user could not be found'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const Id = (req.headers.id)
  Users.getById(Id)
  .then(userId => {
    if(userId){
      req.user = userId
      next()
    } else {
      res.status(404).json({message: "invalid user id"})
    }
  }
  )
  .catch( res => {
    res.status(500).json({message: 'Could not validate Id'})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  // create a var for body, grab body out of request
  // if statements, if there is no body 400 on userdata
  // if body name missing 400
  // next() if both
  const Body = (req.params.body)
  Name.get(Body)
  .then(getBody => {
    if(getBody){
      req.body = getBody
      next()
    } else {
      res.status(400).json({ message: "missing required name field" })
    }
  }

  )
  .catch(res => {
    res.status(500).json({message: 'could not validate user'})
  })
}

function validatePost(req, res, next) {
  // do your magic!
  const Post = (req.params.post)
  UserPosts.getUserPosts(Post)
  .then(getPost => {
    if(getPost){
      req.post = getPost
      next()
    } else {
      res.status(400).json({ message: "missing required text field" })
    }
  })
  .catch(res => {
    res.status(500).json({message: 'could not validate post'})
  })
}

module.exports = router;

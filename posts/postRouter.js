const express = require('express');
const Posters = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posters.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot retrieve posts'})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const Id = (req.params.id)
  Posters.getById(Id)
  .then(postid => {
    res.status(200).json(postid)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot retrieve post id'})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const Id = (req.params.id)
  Posters.remove(Id)
  .then(dead => {
    res.status(200).json(dead)
  })
  .catch(err => {
    res.status(500).json({message: 'cannot delete user'})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  Posters.update(req.params.id, req.post)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'The post could not be found'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'The post could not be found'})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const Id = (req.headers.id)
  Posters.getById(Id)
  .then(postId => {
    if(postId){
      req.post = postId
      next()
    } else {
      res.status(404).json({message: "invalid post id"})
    }
  }
  )
  .catch( res => {
    res.status(500).json({message: 'Could not validate Id'})
  })
}

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require("../data/db");

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(posts => {
      res.status(201).json({success: true, posts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({success: false, message: 'Error creating the posts',});
    });
});

router.post('/:id/comments', (req, res) => {
  db.insertComment({...req.body, post_id: req.params.id})
    .then(comments => {
      res.status(201).json({success: true, comments});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({success: false, message: 'Error creating the comment',});
    });
});

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({success: true, posts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({success: false, message: 'Error retrieving the posts',});
    });
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post[0]) {
        res.status(200).json({success: true, post})
      } else {
        res.status(404).json({success: false, message: "The post with the specified ID does not exist."})
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({success: false, message: 'Error retrieving the posts'});
  });
})

router.get("/:id/comments", (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments[0]) {
        res.status(200).json({success: true, comments})
      } else {
        res.status(404).json({success: false, message: "The post with the specified ID does not exist."})
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({success: false, message: 'Error retrieving the comments'});
  });
})


module.exports = router
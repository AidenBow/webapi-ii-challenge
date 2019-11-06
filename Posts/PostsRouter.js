const express = require('express');
const router = express.Router();
const db = require("../data/db");


router.get('/', (req, res) => {
  console.log(req.query);
  db.find(req.query)
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

module.exports = router
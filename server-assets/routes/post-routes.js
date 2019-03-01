let Posts = require('../models/post')
let Comments = require('../models/comment')
let router = require('express').Router()

//GET ALL POSTS
router.get('', (req, res, next) => {
  Posts.find({})
    .then(posts => res.send(posts))
    .catch(err => res.status(400).send(err))
})

//ADD POST
router.post('', (req, res, next) => {
  Posts.create(req.body)
    .then(post => res.send(post))
    .catch(err => res.status(400).send(err))
})

//DELETE POST
router.delete("/:id", (req, res, next) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.send("cool story you killed the kingdom"))
    .catch(err => res.status(400).send(err))
})

//GET ALL RELATED COMMENTS


module.exports = { router } 
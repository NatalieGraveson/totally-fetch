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
    .then(() => res.send("Wow, you killed my Post!"))
    .catch(err => res.status(400).send(err))
})

//GET ALL RELATED COMMENTS
router.get('/:id/comments', (req, res, next) => {
  Comments.find({ post: req.params.id })
    .then(comments => res.send(comments))
    .catch(err => res.status(401).send(err))
})

module.exports = { router } 
let Comments = require('../models/comment')
let router = require('express').Router()

//GET ALL POSTS
router.get('', (req, res, next) => {
  Comments.find({})
    .then(comments => res.send(comments))
    .catch(err => res.status(400).send(err))
})



//ADD POST
router.post('', (req, res, next) => {
  Comments.create(req.body)
    .then(comment => res.send(comment))
    .catch(err => res.status(400).send(err))
})

//DELETE POST
router.delete("/.id", (req, res, next) => {
  Comments.findByIdAndDelete(req.params.id)
    .then(() => res.send("that's so FETCH that you deleted this comment!")
    )
    .catch(err => res.status(400).send(err))
})


exports.router = router

let Comments = require('../models/comment')
let router = require('express').Router()

//GET ALL COMMENTS
router.get('', (req, res, next) => {
  Comments.find({})
    .then(comments => res.send(comments))
    .catch(err => res.status(400).send(err))
})

//ADD COMMENTS
router.post('', (req, res, next) => {
  Comments.create(req.body)
    .then(comment => res.send(comment))
    .catch(err => res.status(400).send(err))
})

//GET COMMENTS BY POST ID
router.get('/:postId', (req, res, next) => {
  Comments.find({ post: req.params.postId })
    .then(comment => {
      return res.status(200).send(comment)
    })
    .catch(err => {
      res.status(500).send({ Error: err })
    })
})


//EDIT COMMENTS
router.put("/:id", async (req, res, next) => {
  try {
    let comment = await Comments.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(comment)
  } catch (err) {
    res.status(400).send(err)
  }
})

//DELETE POST
router.delete("/:id", (req, res, next) => {
  Comments.findByIdAndDelete(req.params.id)
    .then(() => res.send("that's so FETCH that you deleted this comment!")
    )
    .catch(err => res.status(400).send(err))
})


exports.router = router



let mongoose = require('mongoose')
let Comments = require('./comment')
let Schema = mongoose.Schema

let post = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25 },
  img: { type: String, required: true },
  description: { type: String },
  timestamp: { type: String },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  comments: { type: Schema.Types.ObjectId, ref: "Comment", virtual: true }
}, {
    timestamps: true
  })

post.pre("remove", function (next) {
  Comments.remove({ post: this._id })
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model("Post", post)
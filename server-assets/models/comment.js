let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let comment = new Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 25 },
  timestamp: { type: String, required: true },
  description: { type: String },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  post: { type: ObjectId, ref: "Post", required: true }
})




module.exports = mongoose.model("Comment", comment)





















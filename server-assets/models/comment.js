let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let comment = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25 },
  timestamp: { type: String },
  description: { type: String },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  post: { type: ObjectId, ref: "Post", required: true },
}, {
    timestamps: true
  })




module.exports = mongoose.model("Comment", comment)





















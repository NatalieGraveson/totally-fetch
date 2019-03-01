import CommentService from "./commentService.js";

//private

let _cs = new CommentService()

function drawComments() {
  console.log('draw comment function from Commentcontroller')
}

//public
export default class CommentController {
  constructor() {
    console.log('comments constructor here')
    _cs.addSubscriber('comments', drawComments);
  }
} 
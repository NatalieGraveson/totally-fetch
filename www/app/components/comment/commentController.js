import CommentService from "./commentService.js";

//private

let _cs = new CommentService()

function drawComments() {
  let comments = _cs.Comment;
  console.log(comments)
  let template = '';
  comments.forEach(comment => {
    template += comment.getTemplate()
  })
  document.getElementById('comments').innerHTML = template;
  document.getElementById('comment-form').innerHTML = `
    <form onsubmit="app.controllers.commentController.createComment(event)">
        <input type="text" name="name" placeholder="Name" required>
        <input type="text" name="description" placeholder="Comment" required>
        <button type="submit">Create Comment</button>
    </form>
    `
}

function drawComment() {
  // @ts-ignore
  document.getElementById('comments').innerHTML = _cs.Comment.getTemplate();
}

//public
export default class CommentController {
  constructor() {
    console.log('comments constructor here')
    _cs.addSubscriber('comments', drawComments);
    _cs.getApiComments()
  }

  createComment(event) {
    event.preventDefault()
    let data = event.target
    let newComment = {
      name: data.name.value,
      description: data.description.value,
    }
    console.log(newComment)
    _cs.createComment(newComment)
    // @ts-ignore
    form.reset()

  }
}
import PostService from "./postService.js";

//private

let _ps = new PostService()

function drawPosts() {
  let posts = _ps.Posts;
  let template = '';
  posts.forEach(post => {
    template += post.getTemplate()
  });
  document.getElementById('posts').innerHTML = template;
  document.getElementById('post-form').innerHTML = ` 
  <form onsubmit="app.controllers.postController.createPost(event)">
        <input type="text" name="name" placeholder="Name" required>
        <input type="url" name="img" placeholder="Image URL" required>
        <input type="text" name="description" placeholder="Post" required>
        <button type="submit">Create Post</button>
    </form>
    `
}

function drawComments() {
  let comments = _ps.Comments;
  let postId = comments[0]._id
  console.log(postId)
  let template = '';
  comments.forEach(comment => {
    template += comment.getTemplate()
  })
  document.getElementById('comments').innerHTML = template;
  document.getElementById('comment-form').innerHTML = `
    <form onsubmit="app.controllers.commentController.createComment(event , '${postId}')">
        <input type="text" name="name" placeholder="Name" required>
        <input type="text" name="description" placeholder="Comment" required>
        <button type="submit">Create Comment</button>
    </form>
    `
}

//public
export default class PostController {
  constructor() {
    console.log('post constructor here')
    _ps.addSubscriber('posts', drawPosts);
    _ps.addSubscriber('activePost', this.setActive);
    _ps.addSubscriber('comments', drawComments);
    _ps.getApiPosts()
    //_ps.getApiComments()
  }
  createPost(event) {
    event.preventDefault();
    let form = event.target;
    let newPost = {
      name: form.name.value,
      img: form.img.value,
      description: form.description.value
    }
    _ps.createPost(newPost)
    form.reset()
  }

  createComment(event, id) {
    event.preventDefault()
    let data = event.target
    let newComment = {
      name: data.name.value,
      description: data.description.value,
      _id: id
    }

    _ps.createComment(newComment)
    // @ts-ignore
    form.reset()
  }

  deletePost(id) {
    _ps.deletePost(id)
  }

  deleteComment(id) {
    _ps.deleteComment(id)
  }

  upvotePost() {

  }

  downvotePost() {

  }

  setActive() {
    _ps.setActive()
  }

} 
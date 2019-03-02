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
        <button class="btn btn-outline-light btn-lg" type="submit">Create Post</button>
    </form>
    `
}

function drawComments() {

  let comments = _ps.Comments;
  let postId = _ps.ActivePost._id
  let template = '';
  comments.forEach(comment => {
    template += comment.getTemplate()
  })
  document.getElementById(postId + 'comment-form').innerHTML = `
  <form onsubmit="app.controllers.postController.createComment(event)">
  <input type="text" name="name" placeholder="Name" required>
  <input type="text" name="description" placeholder="Comment" required>
  <button type="submit">Create Comment</button>
  </form>
  `
  document.getElementById(postId + 'comments').innerHTML = template;
}

//public
export default class PostController {
  constructor() {
    _ps.addSubscriber('posts', drawPosts);
    _ps.addSubscriber('comments', drawComments);
    _ps.getApiPosts()
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

  createComment(event) {
    event.preventDefault()
    let form = event.target;
    let newComment = {
      name: form.name.value,
      description: form.description.value
    }

    _ps.createComment(newComment)
    form.reset()
  }

  deletePost(id) {
    _ps.deletePost(id)
  }

  deleteComment(id) {
    _ps.deleteComment(id)
  }

  upvotePost(id) {
    _ps.upvotePost(id)
  }

  downvotePost(id) {
    _ps.downvotePost(id)

  }

  upvoteComment(id) {
    _ps.upvoteComment(id)
  }

  downvoteComment(id) {
    _ps.downvoteComment(id)
  }

  setActive(id) {
    _ps.setActive(id)
  }

  sortByVotes() {
    _ps.sortByVotes()
  }
} 
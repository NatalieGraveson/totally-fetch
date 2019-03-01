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

function drawPost() {
  document.getElementById('posts').innerHTML = _ps.Post.getTemplate();
}


//public
export default class PostController {
  constructor() {
    console.log('post constructor here')
    _ps.addSubscriber('posts', drawPosts);
    _ps.addSubscriber('post', drawPost);
    _ps.getApiPosts()
  }
  createPost(event) {
    event.preventDefault();
    let form = event.target;
    let newPost = {
      name: form.name.value,
      img: form.img.value,
      description: form.description.value,
    }
    _ps.createPost(newPost)
    form.reset()
  }

  deletePost(id) {
    _ps.deletePost(id)
  }

} 
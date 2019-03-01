import PostService from "./postService.js";

//private

let _ps = new PostService

function drawPost() {
  document.getElementById('posts').innerHTML = _ps.Post.getTemplate();
}

function drawPosts() {
  console.log('draw post function from postcontroller')
}

//public
export default class PostController {
  constructor() {
    console.log('post constructor here')
    _ps.addSubscriber('posts', drawPosts);
    _ps.addSubscriber('post', drawPost);
  }
} 
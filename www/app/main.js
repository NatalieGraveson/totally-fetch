
import PostController from "./components/post/postController.js";
import CommentController from "./components/comment/commentController.js";

class App {
  constructor() {
    this.controllers = {
      postController: new PostController(),
      commentController: new CommentController(),
    }
  }
}

window['app'] = new App()
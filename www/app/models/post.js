export default class Post {
  constructor(data) {
    console.log('post model.... yeahhhhhhhhhhhhhhhh fetch');
    this.name = data.name
    this._id = data._id
    this.description = data.description
    this.img = data.img
    this.timestamp = data.timestamp
    this.upvote = data.upvote
    this.downvote = data.upvote
    this.comments = data.comments
  }
  getTemplate() {
    return `
        <div class="card">
        <h5 class="card-title">${this.name}</h5>
        <div class="card-body text-center">
        <img class="card-img" src="${this.img}" alt="Card image cap">
                <p class="card-text">${this.description} <br> ${this.timestamp}</p>
                <a><i onclick="app.controllers.postController.upvotePost()" class="fas fa-caret-up">SO FETCH: ${this.upvote}</i></a> <hr>
                <a><i onclick="app.controllers.postController.downvotePost()" class="fas fa-caret-down">IT'S NOT GONNA HAPPEN: ${this.downvote}</i></a>
                <button type="button" onclick="app.controllers.postController.deletePost('${this._id}')" class="btn btn-outline-danger delete-button">Delete</button>
                <section id="comment-form"></section>
                <section id="comments"></section>
                </div>
        </div>
        `
  }
}    
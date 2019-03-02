export default class Comment {
  constructor(data) {
    this.name = data.name
    this._id = data._id
    this.upvote = data.upvote
    this.downvote = data.downvote
    this.description = data.description
  }

  getTemplate() {
    return `
        <div class="card">
            <div class="card-body">
                <h7 class="card-title">Commented by: ${this.name}</h7>
                <p class="card-text">${this.description}</p>
                <i class="fas fa-caret-up"></i>
                <i class="upvote" onclick="app.controllers.postController.upvoteComment('${this._id}')">SO FETCH: ${this.upvote}</i>
                <hr>
                <i class="fas fa-caret-down"></i>
                <i class="downvote" onclick="app.controllers.postController.downvoteComment('${this._id}')">IT'S NOT GONNA HAPPEN: ${this.downvote}</i>
                <br>
                <button class="delete btn btn-outline-danger" onclick="app.controllers.postController.deleteComment('${this._id}')">Delete</button>
            </div >
        </div > `
  }


} 
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
        <div class="card-body">
        <img class="card-img" src="${this.img}" alt="Card image cap">
                <p class="card-text">${this.description} <br> ${this.timestamp}</p>
                <button>SO FETCH${this.upvote}</button>
                <button>IT'S NOT GONNA HAPPEN ${this.downvote}</button>
                <section id="comments"></section>
            </div>
        </div>`
  }
}
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
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <button>SO FETCH${this.upvote}</button>
                <button>IT'S NOT GONNA HAPPEN ${this.downvote}</button>
            </div >
        </div > `
  }


} 
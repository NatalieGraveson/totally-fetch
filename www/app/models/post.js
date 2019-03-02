export default class Post {
  constructor(data) {
    this.name = data.name
    this._id = data._id
    this.description = data.description
    this.img = data.img
    //this.vote = data.upvote + data.downvote
    this.upvote = data.upvote
    this.downvote = data.downvote
    this.comments = data.comments
    this.createdAt = data.createdAt
    this.date = formatDate()
    this.time = formatTime()
    this.updatedAt = data.updatedAt
    this.value = data.value

    function formatDate() {
      let newArr = data.createdAt.split('')
      for (let i = 0; i < 8; i++) {
        newArr.pop()
      }
      newArr[10] = " "
      let output = newArr.join('').split(' ')
      return output[0]
    }

    function formatTime() {
      let newArr = data.createdAt.split('')
      for (let i = 0; i < 8; i++) {
        newArr.pop()
      }
      newArr[10] = " "
      let output = newArr.join('').split(' ')
      console.log(output)
      let time = output[1].split(':')
      let hours = Number(time[0])
      let minutes = time[1]
      console.log(hours)
      console.log(minutes)
      if (hours <= 12) {
        return hours + ': ' + minutes + 'am'
      }
      else if (hours > 12) {
        return (hours - 12) + ': ' + minutes + 'pm'
      }
    }
  }

  getTemplate() {
    return `
      <div class="card bg-light mb-3 w-75">
        <h5 class="card-title">Fetched by: ${this.name}</h5>
        <h8>${this.time} ~ ${this.date}</h8>
        <img class="card-img" src="${this.img}" alt="Card image cap">
        <p class="card-text">${this.description} </p>
        <div class="card-body text-center">
            <i class="fas fa-caret-up"></i>
            <i onclick="app.controllers.postController.upvotePost('${this._id}')" class="upvote">SO FETCH: ${this.upvote}</i>
            <hr>
            <i class="fas fa-caret-down"></i>
            <i onclick="app.controllers.postController.downvotePost('${this._id}')" class="downvote">IT'S NOT GONNA HAPPEN: ${this.downvote}</i>
            <br>
            <button class="btn btn-info"  onclick="app.controllers.postController.setActive('${this._id}') ">Show Comments</button>
            <button type="button" class="btn btn-outline-danger   delete-button"onclick="app.controllers.postController.deletePost  ('${this._id}')">Delete</button>
            <section id="${this._id}comment-form"></section>
            <section id="${this._id}comments"></section>
        </div>
      </div>
          `
  }
}
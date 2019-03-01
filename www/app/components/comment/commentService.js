import Comment from "../../models/comment.js";

// @ts-ignore
let _commentApi = axios.create({
  baseURL: "/api"
});


let _state = {
  comments: [],
};

let _subscribers = {
  comments: [],
};

function _setState(prop, val) {
  _state[prop] = val;
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class CommentService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get Comment() {
    return _state.comments.map(c => new Comment(c))
  }

  createComment(comment) {
    _commentApi.create('comments', comment)
      .then(res => {
        _state.comments.push(res.data)
        _setState('comments', _state.comments)

      })
  }

  constructor() {
    console.log('hello, I\'m the CS constructor');
    _commentApi.get('comments')
      .then(res => {
        _setState('comments', res.data)
      })
  }

}
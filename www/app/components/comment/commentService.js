// @ts-ignore
let _commentApi = axios.create({
  baseURL: "/api"
});


let _state = {
  comments: [],
};

let _subscribers = {
  posts: [],
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

  get Comments() {
    return _state.posts.map(c => new Comment(c))
  }

  createComment(comment) {
    _commentApi.post('comments', comment)
      .then(res => {
        _state.posts.push(res.data)
        _setState('comments', _state.comments)
      })
  }

  constructor() {
    console.log('hello, I\'m the CS constructor');
    _commentApi.get('posts')
      .then(res => {
        _setState('posts', res.data)
      })
  }

}
import Post from "../../models/post.js";

//private

// @ts-ignore
let _postApi = axios.create({
  baseURL: "/api"
});


let _state = {
  posts: [],
  post: {}
};

let _subscribers = {
  posts: [],
  post: []
};

function _setState(prop, val) {
  _state[prop] = val;
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class PostService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get Posts() {
    return _state.posts.map(p => new Post(p))
  }

  get Post() {
    //for testing. change for specific post later
    return _state.posts[0]
  }

  createPost(post) {
    _postApi.post('posts', post)
      .then(res => {
        _state.posts.push(res.data)
        _setState('posts', _state.posts)
      })
  }




  constructor() {
    console.log('hello, I\'m the PS constructor');
    _postApi.get('posts')
      .then(res => {
        _setState('posts', res.data)
      })
  }

}
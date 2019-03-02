import Post from "../../models/post.js";
import Comment from "../../models/comment.js";

//private

// @ts-ignore
let _api = axios.create({
  baseURL: "/api"
});


let _state = {
  posts: [],
  activePost: {},
  comments: [],
};

let _subscribers = {
  posts: [],
  activePost: [],
  comments: []
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

  setActive(id) {
    _api.get('posts/' + id)
      .then(res => {
        let data = new Post(res.data)
        _setState('activePost', data)
      })
  }

  get Comments() {
    return _state.comments.map(c => new Comment(c))
  }

  get Posts() {
    return _state.posts.map(p => new Post(p))
  }

  get ActivePost() {
    //for testing. change for specific post later
    return _state.activePost
  }

  getApiPosts() {
    _api.get('/posts')
      .then(res => {
        let postData = res.data.map(p => new Post(p))
        _setState('posts', postData)
      })
  }

  getApiComments() {
    _api.get('/comments')
      .then(res => {
        let commentData = res.data.map(c => new Comment(c))
        _setState('comments', commentData)
      })
  }

  createPost(rawPost) {
    let newPost = new Post(rawPost);
    _api.post('posts', newPost)
      .then(res => {
        _state.posts.unshift(res.data)
        _setState('posts', _state.posts)
      })
  }


  createComment(comment) {
    _api.create('/comments', comment)
      .then(res => {
        _state.comments.push(res.data)
        _setState('comments', _state.comments)
      })
  }

  deletePost(id) {
    _api.delete('posts/' + id)
      .then(res => {
        this.getApiPosts()
      })
  }

  deleteComment(id) {
    _api.delete('comments/' + id)
      .then(res => {
        this.getApiComments()
      })
  }

  getActivePost() {

  }

  upvotePost() {

  }

  downvotePost() {

  }

  constructor() {
    console.log('hello, I\'m the PS constructor');
    this.getApiPosts()
  }

} 
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

  getApiPosts() {
    _postApi.get('/posts')
      .then(res => {
        let postData = res.data.map(p => new Post(p))
        _setState('posts', postData)
      })
  }

  createPost(rawPost) {
    let newPost = new Post(rawPost);
    _postApi.post('posts', newPost)
      .then(res => {
        _state.posts.unshift(res.data)
        _setState('posts', _state.posts)
      })
  }

  deletePost(id) {
    _postApi.delete('posts/' + id)
      .then(res => {
        this.getApiPosts()
      })
  }




  constructor() {
    console.log('hello, I\'m the PS constructor');
    this.getApiPosts()
  }

}
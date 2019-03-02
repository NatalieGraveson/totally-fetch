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
        this.getApiComments(id)
      })
  }

  get Comments() {
    return _state.comments.map(c => new Comment(c))
  }

  get Posts() {
    return _state.posts.map(p => new Post(p))
  }

  get ActivePost() {
    return _state.activePost
  }

  getApiPosts() {
    _api.get('/posts')
      .then(res => {
        let postData = res.data.map(p => new Post(p))
        this.sortByVotes(postData)
      })
  }

  getApiComments(postId) {
    _api.get('/comments/' + postId)
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

  createComment(rawComment) {
    rawComment.post = _state.activePost._id
    _api.post('comments', rawComment)
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
        this.getApiComments(_state.activePost._id)
      })
  }


  upvotePost(id) {
    let postToChange = _state.posts.find(p => p._id == id);
    postToChange.upvote++
    let newPost = postToChange
    _api.put('/posts/' + id, newPost)
      .then(res => {
        this.getApiPosts()
      })
      .catch(err => {
        console.error(err)
      })
  }

  downvotePost(id) {
    let postToChange = _state.posts.find(p => p._id == id);
    postToChange.downvote++
    let newPost = postToChange
    _api.put('/posts/' + id, newPost)
      .then(res => {
        this.getApiPosts()
      })
      .catch(err => {
        console.error(err)
      })
  }

  upvoteComment(id) {
    let commentToChange = _state.comments.find(c => c._id == id);
    commentToChange.upvote++
    let newComment = commentToChange
    _api.put('/comments/' + id, newComment)
      .then(res => {
        this.getApiComments(_state.activePost._id)
      })
      .catch(err => {
        console.error(err)
      })
  }

  downvoteComment(id) {
    let commentToChange = _state.comments.find(c => c._id == id);
    commentToChange.downvote++
    let newComment = commentToChange
    _api.put('/comments/' + id, newComment)
      .then(res => {
        this.getApiComments(_state.activePost._id)
      })
      .catch(err => {
        console.error(err)
      })
  }

  sortByVotes(postData) {
    postData.sort((a, b) => {
      let val = a.upvote - b.upvote
      if (val > 0) {
        return -1
      } else if (val < 0) {
        return 1
      }
      return 0
    })
    _setState('posts', postData)
  }
  constructor() {
    this.getApiPosts()
  }

  // upVote(id) {
  //   let data = _state.activePost.upVote++
  //   let active = _state.activePost
  //   _api.put('posts/' + id, active)
  //     .then(res => {
  //       this.setActivePost(id)
  //     })
  // }

} 
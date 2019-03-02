//PRIVATE



let _state = {
  activeUser: []
}

let _subscribers = {
  activeUser: []
}


function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn())
}

//PUBLIC

export default class userService {
  constructor() { }
  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }

  loadUser







}
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

export default class UserService {
  constructor() { }
  addSubscribers(prop, fn) {
    _subscribers[prop].push(fn)
  }

  //GETS


  //GENERAL
  drawLogin() { }

  login() { }

  logout() { }





}
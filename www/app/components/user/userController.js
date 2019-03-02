//PRIVATE
import UserService from "./userService.js"
let _userService = new UserService()










//PUBLIC
export default class UserController {
  constructor() {
    _userService.drawLogin()
    _userService.addSubscribers('activeUser', drawActiveUser)
  }

  login() { }


  logout() { }





}
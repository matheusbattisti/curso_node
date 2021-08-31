const User = require('../models/User')

module.exports = class UserController {
  static login(req, res) {
    res.render('auth/login')
  }
  static register(req, res) {
    res.render('auth/register')
  }
}

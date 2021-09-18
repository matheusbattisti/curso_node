const User = require('../models/User')

module.exports = class UserController {
  static getAll() {
    console.log('todos os users')
  }

  static create() {
    console.log('criando user')
  }
}

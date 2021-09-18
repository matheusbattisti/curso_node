const Pet = require('../models/Pet')

module.exports = class PetController {
  static getAll() {
    console.log('todos os pets')
  }

  static create() {
    console.log('criando pet')
  }
}

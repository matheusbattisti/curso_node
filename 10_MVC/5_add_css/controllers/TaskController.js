const Task = require('../models/Task')

module.exports = class TaskController {
  static createTask(req, res) {
    res.render('tasks/create')
  }

  static showTasks(req, res) {
    res.render('tasks/all')
  }
}

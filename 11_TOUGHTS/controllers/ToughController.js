const Tought = require('../models/Tought')

module.exports = class ToughController {
  static createTought(req, res) {
    res.render('toughts/create')
  }

  static createToughtSave(req, res) {
    const Tought = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }

    Tought.create(Tought)
      .then(res.redirect('/toughts'))
      .catch((err) => console.log())
  }

  static showToughts(req, res) {
    Tought.findAll({ raw: true })
      .then((data) => {
        let emptyToughs = false

        if (data.length === 0) {
          emptyToughs = true
        }

        res.render('toughts/all', { toughts: data, emptyToughs })
      })
      .catch((err) => console.log(err))
  }

  static removeTought(req, res) {
    const id = req.body.id

    Tought.destroy({ where: { id: id } })
      .then(res.redirect('/toughts'))
      .catch((err) => console.log())
  }

  static updateTought(req, res) {
    const id = req.params.id

    Tought.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('toughts/edit', { Tought: data })
      })
      .catch((err) => console.log())
  }

  static updateToughtPost(req, res) {
    const id = req.body.id

    const Tought = {
      title: req.body.title,
      description: req.body.description,
    }

    Tought.update(Tought, { where: { id: id } })
      .then(res.redirect('/toughts'))
      .catch((err) => console.log())
  }

  static toggleToughtStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const Tought = {
      done: req.body.done === '0' ? true : false,
    }

    console.log(Tought)

    Tought.update(Tought, { where: { id: id } })
      .then(res.redirect('/toughts'))
      .catch((err) => console.log())
  }
}

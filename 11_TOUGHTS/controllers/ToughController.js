const Tought = require('../models/Tought')

module.exports = class ToughController {
  static createTough(req, res) {
    res.render('toughs/create')
  }

  static createToughSave(req, res) {
    const Tought = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }

    Tought.create(Tought)
      .then(res.redirect('/toughs'))
      .catch((err) => console.log())
  }

  static showToughs(req, res) {
    Tought.findAll({ raw: true })
      .then((data) => {
        let emptyToughs = false

        if (data.length === 0) {
          emptyToughs = true
        }

        res.render('toughs/all', { toughs: data, emptyToughs })
      })
      .catch((err) => console.log(err))
  }

  static removeTough(req, res) {
    const id = req.body.id

    Tought.destroy({ where: { id: id } })
      .then(res.redirect('/toughs'))
      .catch((err) => console.log())
  }

  static updateTough(req, res) {
    const id = req.params.id

    Tought.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('toughs/edit', { Tought: data })
      })
      .catch((err) => console.log())
  }

  static updateToughPost(req, res) {
    const id = req.body.id

    const Tought = {
      title: req.body.title,
      description: req.body.description,
    }

    Tought.update(Tought, { where: { id: id } })
      .then(res.redirect('/toughs'))
      .catch((err) => console.log())
  }

  static toggleToughStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const Tought = {
      done: req.body.done === '0' ? true : false,
    }

    console.log(Tought)

    Tought.update(Tought, { where: { id: id } })
      .then(res.redirect('/toughs'))
      .catch((err) => console.log())
  }
}

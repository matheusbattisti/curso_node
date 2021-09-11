const Product = require('../models/Product')

module.exports = class ToughController {
  static async showProducts(req, res) {
    const products = await Product.find({}).lean()

    console.log(products)

    res.render('products/all', { products })
  }

  static createProduct(req, res) {
    res.render('products/create')
  }

  static async createProductPost(req, res) {
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const image = req.body.image

    const product = new Product({ name, price, description, image })

    await product.save()

    res.redirect('/products')
  }

  static async getProduct(req, res) {
    const id = req.params.id

    const product = await Product.findById(id).lean()

    //console.log(product)

    res.render('products/product', { product })
  }

  static async removeProduct(req, res) {
    const id = req.params.id

    await Product.deleteOne({ _id: id })

    res.redirect('/products')
  }

  static async editProduct(req, res) {
    const id = req.params.id

    const product = await Product.findById(id).lean()

    res.render('products/edit', { product })
  }

  static async editProductPost(req, res) {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const image = req.body.image

    console.log(req.body)

    const product = { name, price, description, image }

    await Product.updateOne({ _id: id }, product)

    res.redirect('/products')
  }
}

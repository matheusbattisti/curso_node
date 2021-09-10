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

    res.redirect('/')
  }

  // static async getProduct(req, res) {
  //   const id = req.params.id

  //   const product = await Product.getProductById(id)

  //   //console.log(product)

  //   res.render('products/product', { product })
  // }

  // static removeProduct(req, res) {
  //   const id = req.params.id

  //   Product.removeProduct(id)

  //   res.redirect('/')
  // }

  // static async editProduct(req, res) {
  //   const id = req.params.id

  //   const product = await Product.getProductById(id)

  //   res.render('products/edit', { product })
  // }

  // static async editProductPost(req, res) {
  //   const id = req.body.id
  //   const name = req.body.name
  //   const price = req.body.price
  //   const description = req.body.description
  //   const image = req.body.image

  //   const product = new Product(name, price, description, image)

  //   await product.updateProduct(id)

  //   res.redirect('/')
  // }
}

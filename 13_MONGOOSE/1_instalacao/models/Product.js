const { ObjectId } = require('mongodb')
const conn = require('../db/conn')

class Product {
  constructor(name, price, description, image) {
    this.name = name
    this.price = price
    this.description = description
    this.image = image
  }

  save() {
    const product = conn.db().collection('products').insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
    })

    return product
  }

  static getProducts() {
    const products = conn.db().collection('products').find().toArray()

    return products
  }

  static async getProductById(id) {
    const product = await conn
      .db()
      .collection('products')
      .findOne({ _id: ObjectId(id) })

    return product
  }

  static async removeProduct(id) {
    await conn
      .db()
      .collection('products')
      .deleteOne({ _id: ObjectId(id) })

    return
  }

  updateProduct(id) {
    conn
      .db()
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: this })

    return
  }
}

module.exports = Product

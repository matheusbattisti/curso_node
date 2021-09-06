const conn = require("../../2_criando_mvc/db/conn");

class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  save() {
    const product = conn.db().collection("products").insertOne({
      name: this.name,
      price: this.price,
      description: this.description,
    });

    return product;
  }
}

module.exports = Product;

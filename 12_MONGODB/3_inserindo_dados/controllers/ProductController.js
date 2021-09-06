const Product = require("../models/Product");

module.exports = class ToughController {
  static showProducts(req, res) {
    res.render("products/all");
  }

  static createProduct(req, res) {
    res.render("products/create");
  }

  static createProductPost(req, res) {
    const name = req.body.name;

    const product = new Product(name, 1, "teste");

    product.save();

    res.redirect("/");
  }
};

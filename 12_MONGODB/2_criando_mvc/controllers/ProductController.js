const Product = require("../models/Product");

module.exports = class ToughController {
  static showProducts(req, res) {
    res.render("products/all");
  }
};

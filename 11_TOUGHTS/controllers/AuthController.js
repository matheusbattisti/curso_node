const User = require("../models/User");

module.exports = class UserController {
  static login(req, res) {
    res.render("auth/login");
  }

  static loginPost(req, res) {
    return false;
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static registerPost(req, res) {
    return false;
  }
};

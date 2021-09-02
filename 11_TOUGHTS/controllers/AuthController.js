const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class UserController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.render("auth/login", {
        message: "Usuário não encontrado!",
      });

      return;
    }

    // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.render("auth/login", {
        message: "Senha inválida!",
      });

      return;
    }

    // auth user
    req.session.userid = user.id;

    res.redirect("/");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // passwords match validation
    if (password != confirmpassword) {
      res.render("auth/register", {
        message: "As senhas não conferem, tente novamente!",
      });

      return;
    }

    // email validation
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      res.render("auth/register", {
        message: "E-mail já utilizado, utilize outro!",
      });

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    User.create(user)
      .then((user) => {
        // initialize session
        req.session.userid = user.id;

        // console.log('salvou dado')
        // console.log(req.session.userid)

        res.redirect("/");
      })
      .catch((err) => console.log(err));
  }

  static logout(req, res) {
    req.session.destroy();

    res.redirect("/login");
  }
};

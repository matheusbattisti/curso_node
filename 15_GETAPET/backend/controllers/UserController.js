const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = class UserController {
  static async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação precisam ser iguais!" });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      // create token
      const token = jwt.sign(
        // payload data
        {
          name: newUser.name,
          id: newUser._id,
        },
        "nossosecret"
      );

      // return token
      res.status(201).json({
        message: "Você realizou o cadastro com sucesso!",
        token: token,
        userId: newUser._id,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário cadastrado com este e-mail!" });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    // create token
    const token = jwt.sign(
      // payload data
      {
        name: user.name,
        id: user._id,
      },
      "nossosecret"
    );

    // return token
    res.json({
      message: "Você está autenticado!",
      token: token,
      userId: user._id,
    });
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    // check if password match
    if (password != confirmpassword) {
      res.status(422).json({ error: "As senhas não conferem." });

      // change password
    } else if (password == confirmPassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      const passwordHash = await bcrypt.hash(reqPassword, salt);
    }

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updateData },
        { new: true }
      );
      res.json({
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

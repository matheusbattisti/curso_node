require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()

// models
const User = require('./models/User')

// Config JSON response
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API!' })
})

app.post('/auth/register', async (req, res) => {
  console.log(req.body)
  const { name, email, password, confirmpassword } = req.body

  // validations
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }

  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' })
  }

  if (password != confirmpassword) {
    res
      .status(422)
      .json({ msg: 'A senha e a confirmação precisam ser iguais!' })
    return
  }

  // check if user exists
  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
    return
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // create user
  const user = new User({
    name: name,
    email: email,
    password: passwordHash,
  })

  try {
    const newUser = await user.save()

    await createUserToken(newUser, req, res)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.folvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

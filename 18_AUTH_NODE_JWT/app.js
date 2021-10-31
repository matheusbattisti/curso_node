const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Config JSON response
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API!' })
})

app.post('/auth/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body

  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }

  if (!email) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }

  if (password != confirmpassword) {
    res
      .status(422)
      .json({ message: 'A senha e a confirmação precisam ser iguais!' })
    return
  }
})

mongoose
  .connect(
    'mongodb+srv://user:password@restfulapibanco.lq7ds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

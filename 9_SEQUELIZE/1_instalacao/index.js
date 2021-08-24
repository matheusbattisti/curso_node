const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.listen(3000)

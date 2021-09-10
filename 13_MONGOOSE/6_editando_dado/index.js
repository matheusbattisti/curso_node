const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const productsRoutes = require('./routes/productsRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/', productsRoutes)

app.listen(3000)

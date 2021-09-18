const express = require('express')

const app = express()

// Config JSON response
app.use(express.json())

// Routes
const PetRoutes = require('./routes/PetRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use('/pets', PetRoutes)
app.use('/users', UserRoutes)

app.listen(3000)

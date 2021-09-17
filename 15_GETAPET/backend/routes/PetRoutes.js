const router = require('express').Router()

const PetController = require('../controllers/PetController')

router.get('/', PetController.getAll)

module.exports = router

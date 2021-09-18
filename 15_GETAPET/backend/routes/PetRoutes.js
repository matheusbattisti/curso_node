const router = require('express').Router()

const PetController = require('../controllers/PetController')

router.get('/', PetController.getAll)
router.post('/create', PetController.create)

module.exports = router

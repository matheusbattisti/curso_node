const router = require('express').Router()

const UserController = require('../controllers/UserController')

router.get('/', UserController.getAll)
router.post('/create', UserController.create)

module.exports = router

const express = require('express')
const router = express.Router()
const ToughController = require('../controllers/ToughController')

// import check auth middleware
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughController.createTought)
router.post('/add', ToughController.createToughtSave)
router.post('/remove', ToughController.removeTought)
router.get('/edit/:id', ToughController.updateTought)
router.post('/edit', ToughController.updateToughtPost)
router.post('/updatestatus', ToughController.toggleToughtStatus)
router.get('/', ToughController.showToughts)

module.exports = router

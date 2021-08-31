const express = require('express')
const router = express.Router()
const ToughController = require('../controllers/ToughController')

router.get('/add', ToughController.createTough)
router.post('/add', ToughController.createToughSave)
router.post('/remove', ToughController.removeTough)
router.get('/edit/:id', ToughController.updateTough)
router.post('/edit', ToughController.updateToughPost)
router.post('/updatestatus', ToughController.toggleToughStatus)
router.get('/', ToughController.showToughs)

module.exports = router

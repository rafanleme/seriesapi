const router = require('express').Router()
const serieCtrl = require('../controllers/generos')

router.get('/', serieCtrl.listar)

module.exports = router
var express = require('express')
var indexController = require('../../controllers/home/indexController')
var router = express()

router.get('/', function (req, res) {
    indexController.index(req, res)
})

module.exports = router
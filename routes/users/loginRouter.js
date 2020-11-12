var express = require('express')
var router = express.Router()
var controller = require('../../controllers/home/loginController')

router.post('/', function (req, res) {
    controller.loginController(req, res)
})
module.exports = router
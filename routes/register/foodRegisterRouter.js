var express = require("express")
var router = express()
var foodController = require("../../controllers/register/foodRegisterController")
const multer = require("../../config/multer")

router.get("/", function (req, res) {
  foodController.foodRegister(req, res)
})

router.post("/insert", function (req, res) {
  foodController.foodInsert(req, res)
})

router.get("/bankList", function (req, res) {
  foodController.bankList(req, res)
})

router.post("/imageUpload", multer.single("img"), function (req, res) {
  foodController.foodImageUpload(req, res)
})

router.post("/jsGridInsert", function (req, res) {
  foodController.jsGridInsert(req, res)
})

router.post("/jsGridDelete", function (req, res) {
  foodController.jsGridDelete(req, res)
})
module.exports = router

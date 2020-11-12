var dbConnection = require('../../config/dbConnection')
var loginDAO = require('../../models/loginDAO')

module.exports.loginController = function (req, res) {

    var login = req.body

    var connection = new dbConnection
    var db = connection.Connection()

    var loginModel = new loginDAO(db)

    loginModel.login(login, function (err, rows) {
        //console.log(rows) 
        if (rows) {
            res.redirect('foodRegister/bankList')
        } else {
            res.sendStatus(400)
        }
    })
    db.close()
}
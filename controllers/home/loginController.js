var dbConnection = require('../../config/dbConnection')
var loginDAO = require('../../models/loginDAO')

module.exports.loginController = function (req, res) {

    var login = req.body

    var connection = new dbConnection
    var db = connection.Connection()

    var loginModel = new loginDAO(db)

    loginModel.login(login, function (err, rows) {
        
        if (rows) {
            req.session.authorized = true
            res.redirect('foodRegister/bankList')
        } else {
            res.sendStatus(400)
        }
    })
    db.close()
}
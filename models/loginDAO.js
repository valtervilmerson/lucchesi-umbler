function AutenticationDAO(connection) {
    this._connection = connection
}

AutenticationDAO.prototype.login = function (login, callback) {
    values = [login.usuario, login.senha]
    this._connection.get("select * from users where us_login = ? and us_password = ?", values, callback)
}

module.exports = AutenticationDAO

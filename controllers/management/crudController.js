var dbConnection = require('../../config/dbConnection')


module.exports.insertDB = function (table, fields, values, callback) {

    connection = new dbConnection
    db = connection.Connection()

    a = JSON.stringify(values).replace("[", "")
    b = a.replace("]", "")

    sql = "insert into " + table + " (" + fields + ") values (" + b + ")"

    console.log(sql)

    db.run(sql, callback)

}
//------------------metodo modularizacao 1------------------
/*function DbConnection(){
    sqlite = require('sqlite3').verbose()
}

DbConnection.prototype.openConnection = function(){
    db = new sqlite.Database('./db/LUCCHESI.db')
    console.log('conexao aberta')
}

DbConnection.prototype.closeConnection = function() {
    db.close()
    console.log('conexao fechada')
}

module.exports = DbConnection*/


//------------------metodo modularizacao 2------------------
/* 


sqlite = require('sqlite3').verbose()


function openConnection() {
    db = new sqlite.Database('./db/LUCCHESI.db')
    console.log('conexao aberta dentro')
}

function closeConnection() {
    db.close()
    console.log('conexao fechada')
}

module.exports = { openConnection, closeConnection }
*/

//------------------metodo mudularizacao 3------------------
/*
function DbConnection(){

   var sqlite = require('sqlite3').verbose()

 this.openConnection = function() {
    db = new sqlite.Database('./db/LUCCHESI.db')
    console.log('conexao aberta')
}

this.closeConnection = function() {
    db.close()
    console.log('conexao fechada')
}
}

module.exports = DbConnection
*/
//------------------metdodo modularizacao 4------------------


class dbConnection {
    constructor() {
        this._sqlite = require('sqlite3').verbose()
    }

    Connection() {    
        var db = new this._sqlite.Database('./db/LUCCHESI.db')
        return db      
    }
}
module.exports = dbConnection
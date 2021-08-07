var dbConnection = require("../../config/dbConnection")
var foodDAO = require("../../models/register/foodDAO")

module.exports.foodRegister = function (req, res) {
  if (req.session.authorized != true) {
    res.redirect("/")
    return
  }

  var connection = new dbConnection()
  var db = connection.Connection()
  var foodModel = new foodDAO(db)

  foodModel.NutrientsList(function (err, rows) {
    //console.log(rows)
    if (rows) {
      res.render("foodRegister", {
        list: rows,
      })
    } else {
      res.sendStatus(400)
    }
  })
  db.close()
}

module.exports.jsGridInsert = function (req, res) {
  var connection = new dbConnection()
  var db = connection.Connection()
  var foodModel = new foodDAO(db)
  let requisition = req.body
  let nutrientsXfood = {}

  requisition.name = requisition.itens.ALIMENTO
  requisition.desc = requisition.itens.DESCRICAO

  foodModel.foodInsert(requisition, function (err, rows) {
    foodModel.lastID(function (err, rows) {
      for (const prop in requisition.ids) {
        nutrientsXfood.nutrientID = requisition.ids[prop]
        nutrientsXfood.qtd = requisition.itens[prop]
        foodModel.foodxNutrientsInsert(
          nutrientsXfood,
          rows.lastID,
          function (err, rows) {}
        )
      }
    })
  })

  db.close()
  res.end()
}

module.exports.foodInsert = function (req, res) {
  var requisition = req.body
  var connection = new dbConnection()
  var db = connection.Connection()
  var foodModel = new foodDAO(db)

  for (x = 0; x < requisition.nutrientID.length; x++) {
    var json = {
      name: requisition.name,
      desc: requisition.desc,
      nutrientID: requisition.nutrientID[x],
      qtd: requisition.qtd[x],
    }

    asyncInsert(json, x == 0)
  }

  foodModel.NutrientsList(function (err, rows) {
    if (rows) {
      res.redirect("./bankList")
    } else {
      res.sendStatus(400)
    }
  })

  db.close()
}

module.exports.bankList = function (req, res) {
  /*  if (req.session.authorized != true) {
         res.redirect('/')
         return
     } */

  var connection = new dbConnection()
  var db = connection.Connection()
  var foodModel = new foodDAO(db)

  foodModel.foodBankListData(function (err, rows) {
    foodModel.NutrientsList(function (err, nutrientsRows) {
      /* //método carregando a view
                        var resultado = []
                        for (let i of rows) {
                            let novo = true
                            for (let x = 0; x < resultado.length; x++) {
                                if (resultado[x].FOOD_ID == i.FOOD_ID) {
                                    resultado[x].NUTRIENTE.push(i.NUTRIENTE)
                                    resultado[x].QUANTIDADE.push(i.QUANTIDADE)
                                    novo = false
                                }
                            }
                            if (novo) {
                                resultado.push({
                                    FOOD_ID: i.FOOD_ID,
                                    ALIMENTO: i.ALIMENTO,
                                    DESCRICAO: i.DESCRICAO,
                                    NUTRIENTE: [i.NUTRIENTE],
                                    QUANTIDADE: [i.QUANTIDADE]
                                })
                            }
                        }
                        rows = resultado
            */
      //---------------------------------------------------------------------------
      //método jsgrid
      //une os registros com o mesmo id de alimento
      var resultado = []
      for (let i of rows) {
        let novo = true
        for (let x = 0; x < resultado.length; x++) {
          if (resultado[x].FOOD_ID == i.FOOD_ID) {
            resultado[x][i.NUTRIENTE] = i.QUANTIDADE
            novo = false
          }
        }
        if (novo) {
          let v = {
            FOOD_ID: i.FOOD_ID,
            ALIMENTO: i.ALIMENTO,
            DESCRICAO: i.DESCRICAO,
          }
          v[i.NUTRIENTE] = i.QUANTIDADE
          resultado.push(v)
        }
      }

      rows = resultado

      //monta um json com todos os nutrientes cadastrados
      var json = {}
      json.nutrientsList = []
      json.nutrientsUnit = []
      json.nutrientsID = []
      for (x = 0; x < nutrientsRows.length; x++) {
        json.nutrientsList.push(nutrientsRows[x].NU_DESCRIPTION)
        json.nutrientsUnit.push(nutrientsRows[x].NU_UNIT)
        json.nutrientsID.push(nutrientsRows[x].NU_ID)
      }

      //adiciona 0 no valor dos nutrientes que o alimento não possui
      let array = []
      for (let i in rows) {
        array = Object.keys(rows[i])
        for (x in json.nutrientsList) {
          if (array.indexOf(json.nutrientsList[x]) == -1) {
            rows[i][json.nutrientsList[x]] = 0
          }
        }
      }

      //adiciona os nutrientes cadastrados ao fim da array para montagem das colunas da tabela
      rows.push(json)

      if (rows) {
        console.log(rows)
        res.format({
          html: function () {
            res.render("foodBank")
          },
          json: function () {
            res.json(rows)
          },
        })
      }
    })
  })
  db.close()
}

module.exports.foodImageUpload = function (req, res) {
  var connection = new dbConnection()
  var db = connection.Connection()
  var foodModel = new foodDAO(db)

  if (req.file != undefined) {
    foodModel.lastID(function (err, lastIDRows) {
      foodModel.imageURLInsert(
        req.file.filename,
        lastIDRows.lastID,
        function (err, rows) {
          if (!err) {
            res.sendStatus(200)
          } else {
            console.log("Erro do upload de imagem")
            console.log(err)
          }
        }
      )
    })
  }
  db.close()
}

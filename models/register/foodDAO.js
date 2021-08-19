function FoodRegisterDAO(connection) {
  this._connection = connection
}

FoodRegisterDAO.prototype.NutrientsList = function (callback) {
  this._connection.all("select * from nutrients", callback)
}

FoodRegisterDAO.prototype.foodInsert = function (requisition, callback) {
  var valuesFood = [requisition.name, requisition.desc]
  var sql = "insert into food (food_name, food_desc) values (?,?)"
  this._connection.run(sql, valuesFood, callback)
}

FoodRegisterDAO.prototype.foodxNutrientsInsert = function (
  requisition,
  lastID,
  callback
) {
  this._connection.run(
    "insert into food_x_nutrients (fxn_food_id, fxn_nu_id, fxn_qtd) values (" +
      lastID +
      "," +
      requisition.nutrientID +
      "," +
      requisition.qtd +
      ")",
    callback
  )
}

FoodRegisterDAO.prototype.foodBankListData = function (callback) {
  let sql =
    "SELECT " +
    "FOOD_ID" +
    ",FOOD_NAME AS ALIMENTO " +
    ",FOOD_DESC AS DESCRICAO" +
    ",NU_DESCRIPTION AS NUTRIENTE " +
    ",FXN_QTD AS QUANTIDADE " +
    "FROM " +
    "FOOD F " +
    "INNER JOIN FOOD_X_NUTRIENTS FN ON F.FOOD_ID = FN.FXN_FOOD_ID " +
    "INNER JOIN NUTRIENTS N ON FN.FXN_NU_ID = N.NU_ID "

  this._connection.all(sql, callback)
}

FoodRegisterDAO.prototype.lastID = function (callback) {
  this._connection.get("SELECT MAX(FOOD_ID) AS lastID FROM FOOD", callback)
}

FoodRegisterDAO.prototype.imageURLInsert = function (
  fileName,
  lastID,
  callback
) {
  this._connection.run(
    'UPDATE FOOD SET FOOD_IMAGE_URL = "' +
      fileName +
      '" WHERE FOOD_ID =' +
      lastID,
    callback
  )
}

FoodRegisterDAO.prototype.deleteItem = function (req, callback) {
  this._connection.run("DELETE FROM FOOD WHERE FOOD_ID = " + req.foodId)
  this._connection.run(
    "DELETE FROM FOOD_X_NUTRIENTS WHERE FXN_FOOD_ID = " + req.foodId
  )
}

FoodRegisterDAO.prototype.tableFoodUpdate = function (req, callback) {
  this._connection.run(
    "UPDATE FOOD SET FOOD_NAME = '" +
      req.item.ALIMENTO +
      "', FOOD_DESC = '" +
      req.item.DESCRICAO +
      "', FOOD_ALTERATION = DATETIME()" +
      " WHERE FOOD_ID = " +
      req.item.FOOD_ID
  )
}

FoodRegisterDAO.prototype.foodxNutrientsUpdate = function (req, callback) {
  this._connection.run(
    "UPDATE FOOD_X_NUTRIENTS SET FXN_QTD = " +
      req.qtd +
      " WHERE FXN_FOOD_ID = " +
      req.food_id +
      " AND FXN_NU_ID = " +
      req.nutrientID
  )
}

FoodRegisterDAO.prototype.nutrientCheck = function (req, callback) {
  this._connection.get(
    "SELECT 1 FROM FOOD_X_NUTRIENTS WHERE FXN_NU_ID = " + req.nutrientID,
    callback
  )
}

FoodRegisterDAO.prototype.checkFoodExistence = function (
  requisition,
  callback
) {
  this._connection.get(
    "SELECT FOOD_ID FROM FOOD WHERE FOOD_NAME LIKE '%" +
      requisition.item.ALIMENTO +
      "%'",
    callback
  )
}

module.exports = FoodRegisterDAO

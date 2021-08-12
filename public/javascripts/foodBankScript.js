const urlServer = "http://nutrisa-com-br.umbler.net"
//const urlServer = "http://localhost:3000"

var ids = {}
//
$(function () {
  InitGridCustomFields()

  $("#jsGrid").jsGrid({
    height: "600",
    width: "100%",

    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    inserting: true,
    pageSize: 20,
    pageButtonCount: 5,

    controller: {
      loadData: function () {
        var d = $.Deferred()

        $.ajax({
          url: urlServer + "/foodRegister/bankList",
          dataType: "json",
        }).done(function (response) {
          response.pop()
          d.resolve(response)
        })

        return d.promise()
      },
      insertItem: function (item) {
        insertedItens = { itens: item, ids: ids }
        return $.ajax({
          type: "POST",
          url: urlServer + "/foodRegister/jsGridInsert",
          data: insertedItens,
        })
      },
      deleteItem: function (item) {
        let deletedItem = { foodId: item.FOOD_ID }
        console.log(deletedItem)
        return $.ajax({
          type: "POST",
          url: urlServer + "/foodRegister/jsGridDelete",
          data: deletedItem,
        })
      },
      updateItem: function (item) {
        let updatedItens = { ids, item }
        return $.ajax({
          type: "POST",
          url: urlServer + "/foodRegister/jsGridUpdate",
          data: updatedItens,
        })
      },
    },
    deleteConfirm: function (item) {
      return "O item " + item.ALIMENTO + " será removido. Tem certeza?"
    },
    fields: [],
  })

  $.ajax({
    headers: {
      Accept: "application/json",
    },
    url: urlServer + "/foodRegister/bankList",
    success: function (data) {
      campos = montarArray(data)
    },
    error: function (e, str) {
      console.log("ERROR : ", e)
      console.log(str)
    },
  })

  function InitGridCustomFields() {
    var FloatNumberField = function (config) {
      jsGrid.NumberField.call(this, config)
    }

    FloatNumberField.prototype = new jsGrid.NumberField({
      filterValue: function () {
        return parseFloat(this.filterControl.val())
      },

      insertValue: function () {
        return parseFloat(this.insertControl.val())
      },

      editValue: function () {
        return parseFloat(this.editControl.val())
      },
    })

    jsGrid.fields.floatNumber = FloatNumberField
  }
})

function montarArray(data) {
  let nutrients = data.pop()
  let campos = [
    {
      type: "control",
    },
    {
      name: "ALIMENTO",
      type: "text",
      width: 150,
      validate: "required",
      title: "Alimento",
      align: "center",
    },
    {
      name: "DESCRICAO",
      type: "text",
      width: 150,
      title: "Descrição",
      align: "center",
    },
  ]

  ids = {}
  for (let x in nutrients.nutrientsList) {
    campos.push(
      JSON.parse(
        `{"name":"${nutrients.nutrientsList[x]}", "width": "110", "type": "floatNumber", "align":"center"}`
      )
    )

    ids[nutrients.nutrientsList[x]] = nutrients.nutrientsID[x]
  }
  $("#jsGrid").jsGrid("option", "fields", campos)
}

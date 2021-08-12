$(function () {
  var isdeletingItem = false

  //create the decimal field
  InitGridCustomFields()

  //create the grid controller
  var db = {
    loadData: function (filter) {
      return $.grep(this.clients, function (client) {
        return (
          (!filter.Name || client.Name.indexOf(filter.Name) > -1) &&
          (filter.Age === undefined || client.Age === filter.Age) &&
          (filter.Married === undefined || client.Married === filter.Married)
        )
      })
    },
    insertItem: function (insertingClient) {
      this.clients.push(insertingClient)
    },
    updateItem: function (updatingClient) {},
    deleteItem: function (deletingClient) {
      var clientIndex = $.inArray(deletingClient, this.clients)
      this.clients.splice(clientIndex, 1)
    },
  }

  //create the grid data
  db.clients = [
    {
      Name: "Otto Clay",
      Salary: 851.53,
      Married: false,
    },
    {
      Name: "Connor Johnston",
      Salary: 852.53,
      Married: false,
    },
    {
      Name: "Lacey Hess",
      Salary: 853.53,
      Married: false,
    },
    {
      Name: "Timothy Henson",
      Salary: 854.53,
      Married: false,
    },
    {
      Name: "Ramona Benton",
      Salary: 855.53,
      Married: true,
    },
  ]

  $("#jsGrid").jsGrid({
    height: "350px",
    width: "100%",
    filtering: true,
    inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    autosearch: true,
    pageSize: 10,
    pageButtonCount: 5,
    confirmDeleting: false,
    noDataContent: "Sem dados",
    pagerFormat:
      "Páginas: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} de {pageCount}",
    pageNextText: "Próxima",
    pagePrevText: "Anterior",
    pageFirstText: "Primeira",
    pageLastText: "Última",
    loadMessage: "A carregar dados...",

    onItemDeleting: function (args) {
      // cancel deletion
      if (isdeletingItem === false) {
        args.cancel = true
        isdeletingItem = true

        swal(
          {
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false,
          },
          function (isConfirm) {
            if (isConfirm) {
              $("#jsGrid").jsGrid("deleteItem", args.item)
              $("#jsGrid").jsGrid("refresh")
              swal("Deleted!", "The row has been deleted.", "success")
            } else {
              swal("Cancelled", "Your data is safe :)", "error")
            }
            isdeletingItem = false
          }
        )
      }
    },

    controller: db,
    data: db.clients,
    fields: [
      { name: "Name", type: "text", width: 150 },
      { name: "Salary", type: "customCurrencyField", width: 80 },
      {
        name: "Married",
        type: "checkbox",
        title: "Is Married",
        sorting: false,
      },
      { type: "control" },
    ],
  })
})

function InitGridCustomFields() {
  var optionsCurrency = {
    digitGroupSeparator: ".",
    decimalCharacter: ",",
    decimalCharacterAlternative: ",",
    currencySymbol: "€",
    currencySymbolPlacement: "s",
    decimalPlacesOverride: 2,
    minimumValue: "0.00",
    emptyInputBehavior: "zero",
    leadingZero: "deny",
    defaultValueOverride: "0.00",
  }

  var jsGridCustomCurrencyField = function (config) {
    jsGrid.Field.call(this, config)
  }

  jsGridCustomCurrencyField.prototype = new jsGrid.Field({
    sorter: function (num1, num2) {
      return num1 - num2
    },
    itemTemplate: function (value) {
      return $.fn.autoFormat(value, optionsCurrency)
    },
    insertTemplate: function (value) {
      this._insertPicker = $('<input type="text">').val(value)
      this._insertPicker.autoNumeric("init", optionsCurrency)
      return this._insertPicker
    },
    editTemplate: function (value) {
      this._editPicker = $('<input type="text">').val(value)
      this._editPicker.autoNumeric("init", optionsCurrency)
      return this._editPicker
    },
    filterTemplate: function () {
      if (!this.filtering) return ""

      var grid = this._grid,
        $result = $('<input type="text">').val(0)
      if (this.autosearch) {
        $result.on("change", function (e) {
          grid.search()
        })
      }

      return $result
    },
    filterValue: function () {
      console.log(this._insertPicker.val())
      return this._insertPicker.val()
    },
    insertValue: function () {
      return this._insertPicker.autoNumeric("get")
    },
    editValue: function () {
      return this._editPicker.autoNumeric("get")
    },
  })

  jsGrid.fields.customCurrencyField = jsGridCustomCurrencyField
}

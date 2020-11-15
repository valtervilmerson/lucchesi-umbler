


var food = [{}]

var clients = [
    { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
    { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
    { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
    { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false }
]

var countries = [
    { Name: "", Id: 0 },
    { Name: "United States", Id: 1 },
    { Name: "Canada", Id: 2 },
    { Name: "United Kingdom", Id: 3 }
]



$.ajax({
    headers: { Accept: "application/json" },
    url: "http://localhost:3000/foodRegister/bankList",
    success: function (data) {

        var nutrients = data.pop()

        var campos = [
            { type: "control" },
            { name: "ALIMENTO", type: "text", width: 150, validate: "required", title: "Alimento", align:"center"  },
            { name: "DESCRICAO", type: "text", width: 150, tilte: "Descrição", align:"center"}
        ]
        
        
        montaArray(campos, data)

        async function montaArray(campos, data){
           await monta(campos)
           await jGrid(campos, data)
        }
        
        function monta(campos){
        for (let x in nutrients.nutrientsList){
            campos.push(JSON.parse(`{"name":"${nutrients.nutrientsList[x]}", "width": "110", "type": "number", "default":"0", "align":"center"}`))

        }
        return campos

    }

    function jGrid(campos, data){

console.log('dentro do jgrid: ' + JSON.stringify(campos))
console.log(data)

    $("#jsGrid").jsGrid({
        width: "100%",
        height: "600px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: data,

        fields: campos/* [
            { name: "ALIMENTO", type: "text", width: 150, validate: "required", title: "Alimento" },
            { name: "DESCRICAO", type: "text", width: 150 },
            { name: "QUANTIDADE", type: "number", width: 100, align: "center" },
            { name: "Country", type: "select", items: food, valueField: "Id", textField: "Name" },
            { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
            
        ] */

    })
}

    },
    error: function (e, str) {
        console.log("ERROR : ", e)
        console.log(str);
    }
})





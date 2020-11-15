
const urlServer = "http://nutrisa-com-br.umbler.net/foodRegister/bankList"
//const urlServer = "http://localhost:3000/foodRegister/bankList"

 $.ajax({
    headers: { Accept: "application/json" },
    url: urlServer,
    success: function (data) {

        let campos = montarArray()
        jsGrid(campos, data)  

        function montarArray() {

            let nutrients = data.pop()
            let campos = [
                { type: "control" },
                { name: "ALIMENTO", type: "text", width: 150, validate: "required", title: "Alimento", align: "center" },
                { name: "DESCRICAO", type: "text", width: 150, title: "Descrição", align: "center" }
            ]
            
            for (let x in nutrients.nutrientsList) {
                campos.push(JSON.parse(`{"name":"${nutrients.nutrientsList[x]}", "width": "110", "type": "number", "align":"center"}`))

            }
            return campos
        }

        function jsGrid(campos, data) {

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

                deleteConfirm: function(item) {
                    return "The client \"" + item.ALIMENTO + "\" will be removed. Are you sure?";
                },

                data: data,

                fields: campos
            })
        }

    },
    error: function (e, str) {
        console.log("ERROR : ", e)
        console.log(str);
    }
})








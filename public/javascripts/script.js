const urlServer = "http://nutrisa-com-br.umbler.net/"
//const urlServer = "http://localhost:3000/"

function login() {

    var json = {
        usuario: document.getElementById('usuario').value,
        senha: document.getElementById('senha').value
    }

    SendRequest(json, "login", function () {
        alert("Usuário ou senha incorretas")
    })
}

function foodInsert() {

    var json = {
        name: document.getElementById('nome').value,
        desc: document.getElementById('descricao').value,
        nutrientID: [],
        qtd: [],
    }

    var nutrientsList = document.getElementById('nutrients_select')

    for (i = 0; i < nutrientsList.childElementCount; i++) {
        json.nutrientID.push(nutrientsList[i].id)
        var text = nutrientsList[i].text
        var qtd = getQtd(text)
        json.qtd.push(qtd)
    }

    // console.log(json)

    function getQtd(v) {
        let pos = v.indexOf(":")
        let qtd = v.substring(pos + 2)
        return qtd
    }

    SendRequest(json, "foodRegister/insert", function () {
        alert("Ocorreu um erro na chamada")
    })

    sendImage(urlServer + "foodRegister/imageUpload")
}

/* document.getElementById('file-input').onchange = function () {
    var registerImage = document.getElementById('input-file')
    loadImage(
        this.files[0],
        function (img) {

            if (registerImage.childNodes[3]) {
                registerImage.removeChild(registerImage.childNodes[3])
            }
            registerImage.appendChild(img)
        },
        { maxWidth: 200, meta: true } // Options
    )
} */

function SendRequest(json, url, callback) {

    json = JSON.stringify(json)

    var conexao = new XMLHttpRequest()

    conexao.open('POST', urlServer + url, true)
    conexao.setRequestHeader("Content-Type", "application/json")
    conexao.send(json)

    conexao.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                window.location = this.responseURL
            } else {
                callback()
            }
        }
    }
}


function nutrientInsert() {

    /* var table = document.getElementById('tableBody')
    var firstRow = document.getElementById('firstRow')
    var rows = table.childElementCount - 1


    if (firstRow != undefined) {
        firstRow.remove()
    }

    $('#nutrientsTable').find('tbody')
        .append('<tr class="linhaSelecionada">' +
            '<td>' + `${rows + 1}` + '</td>' +
            '<td>' + $('#nutrients :selected').text() + '</td>' +
            '<td>' + document.querySelector('#nutrients option:checked').dataset.descritivo + '</td>' +
            '<td>' + $('#quantidade').val() + '</td>'
        ) */

    var nutrientsList = document.getElementById('nutrients_select')
    var option = document.createElement("option")
    option.innerHTML = $('#nutrients :selected').text() + "Quantidade: " + $('#quantidade').val() //+ " " + document.querySelector('#nutrients option:checked').dataset.descritivo
    numValues = nutrientsList.childElementCount + 1
    option.value = numValues
    option.id = $('#nutrients :selected').val()
    nutrientsList.appendChild(option) 
}

function nutrientRemove() {

    valor = $('#nutrients_select :selected').val()
    if (valor > 0) {
        var nutrientsList = document.getElementById('nutrients_select')

        numValues = nutrientsList.childElementCount

        if (numValues < valor) {
            valor = numValues
        }
        nutrientsList.removeChild(nutrientsList.childNodes[valor])
    }
}


function sendImage(url) {

    var form = $('#fileUploadForm')[0];

    // Create an FormData object
    var data = new FormData(form);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: url,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#result").text(data);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
        }
    })
}

document.addEventListener("click", function () {
    $('tr').on('click', function () {
        $('.linhaSelecionada').removeClass('linhaSelecionada')
        $(this).addClass('linhaSelecionada')
    })
});



$('#btnRemove').on('click', function () {
    $('.linhaSelecionada').remove()
})

$('#ajax').on('click', function(){
$.ajax({
    headers:{Accept: "application/json"},
    url: "http://localhost:3000/foodRegister/bankList",
    success: function (data) {
        console.log("SUCCESS : ", data);
    },
    error: function (e, str) {
        console.log("ERROR : ", e)
        console.log(str);
    }
    })
})





app = require('./config/serverConfig')

const port = 3000
app.listen(port, function(){
    console.log('Servidor Online na porta ' +  port)
})
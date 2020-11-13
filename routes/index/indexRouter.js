express = require('express')
router = express()

router.get('/', function(req, res){
    let host = process.env.HOST
    console.log(host)
    res.render('index', {host: host})
})


module.exports = router
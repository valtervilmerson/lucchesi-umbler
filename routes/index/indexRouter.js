express = require('express')
router = express()

router.get('/', function(req, res){
    let host = process.env.HOST
    res.render('index', {host: host})
})


module.exports = router
express = require('express')
router = express()

router.get('/', function(req, res){
    let host = process.env.HOST
    console.log(host)
    res.render('index', {url:host})
})


module.exports = router
express = require('express')
router = express()

router.get('/', function(req, res){
    res.render('index')
})


module.exports = router
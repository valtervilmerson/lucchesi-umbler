module.exports.index = function(req, res){
    req.session.destroy(function (err) {
        res.render('index')
    })
}
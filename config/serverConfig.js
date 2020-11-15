var express = require('express')
var path = require('path')
var app = express()
var indexRouter = require(path.join(process.cwd(), '/routes/index/indexRouter'))
var loginRouter = require(path.join(process.cwd(), '/routes/users/loginRouter'))
var foodRegisterRouter = require(path.join(process.cwd(), '/routes/register/foodRegisterRouter'))
var expressSession = require('express-session')


//configs
app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'ejs')

//middlewares
app.use(express.static(path.join(process.cwd(), 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(expressSession({
    secret: 'lucchesi',
    resave: false,
    saveUninitialized: false
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

//routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/foodRegister', foodRegisterRouter)

app.use(function (req, res, next) {
    res.status(404).render('errors/404');
    next();
});

/* middleware que configura msgs de erro internos */
app.use(function (err, req, res, next) {
    res.status(500).render('errors/500', { error: err });
    next();
});

module.exports = app
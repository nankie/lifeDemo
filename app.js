var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoInit = require('./server/mongoInit');
var routeList = require('./server/route_list');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//--静态资源映射
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user',express.static(path.join(__dirname, 'public')));



//--配置sesssion 需要有cookie-parser
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'love'
}));

//--登录过滤器，注意位置要在路由前面
app.use('/',function(req,res,next){
    var url = req.url;
    console.log(url+'*'+__dirname);
    next();
})
app.use('/user',function(req,res,next){
    var url = req.url;
    console.log(url+'*'+__dirname);
    if(!req.session.user){
        return res.render('warning');
    }
    next(); //next 方法一定要在语句最后
});
// app.use('/user/javascripts',function(req,res,next){
//     var url = req.url;
//     console.log(url);
//     next(); //next 方法一定要在语句最后
// });




//--动态迭代添加路由
routeList.initRouters(function(routes){
    for( var i in routes){
        app.use(routes[i][0],routes[i][1]);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//--global with db 全局参数化
global.db = mongoInit.getDB();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * Created by fyf-hey on 2017/4/26.
 */
var index = require('../routes/index');
var registerRouter = require('../routes/registerRouter');
var loginRouter = require('../routes/loginRouter');
var toLoginRouter = require('../routes/toLoginRouter');
var homeRouter = require('../routes/homeRouter');
var newspaper = require('../routes/newspaper');
var getAnnal = require('../routes/getAnnal');
var uploadArticleImage = require('../routes/uploadArticleImage');

var list = [];
/*路由列表*/
list.push(['/' , index]);
list.push(['/register' , registerRouter]);
list.push(['/login' , loginRouter]);
list.push(['/toLogin' , toLoginRouter]);
list.push(['/user/home' , homeRouter]);
list.push(['/newspaper' , newspaper]);
list.push(['/getAnnal' , getAnnal]);
list.push(['/user/uploadArticleImage' , uploadArticleImage]);

exports.initRouters = function(callBack){
    callBack(list);
}
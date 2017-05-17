var helper = require('../DBHelper/helper');
var articleDao = require('../DBSql/articleDao');
var mongoose = require('mongoose');

exports.addArticle = function (articleBean,callBack) {
    articleBean._id = new mongoose.Types.ObjectId();
    articleDao.addArticle([articleBean],helper,function(result){
        callBack(result);
    });
}
var helper = require('../DBHelper/helper');
var articleDao = require('../DBSql/articleDao');
var mongoose = require('mongoose');

exports.addArticle = function (articleBean,callBack) {
    articleBean._id = new mongoose.Types.ObjectId();
    articleDao.addArticle([articleBean],helper,function(result){
        callBack(result);
    });
}
exports.addHotUser = function(mark,userId,callBack){
    articleDao.updateArticle({Mark:mark},{$addToSet:{HotUserIds:userId}},helper,function(result){
        callBack(result);
    });
}
exports.addDownUser = function(mark,userId,callBack){
    articleDao.updateArticle({Mark:mark},{$addToSet:{DownUserIds:userId}},helper,function(result){
        callBack(result);
    });
}
var helper = require('../DBHelper/helper');
var commentDao = require('../DBSql/commentDao');
var mongoose = require('mongoose');

exports.addComment = function (commentBean,callBack) {
    commentBean._id = new mongoose.Types.ObjectId();
    commentDao.addComment([commentBean],helper,function(result){
        callBack(result);
    });
}

exports.findCommentsByArticle = function(mark,callBack){
    commentDao.findComment({Mark:mark},helper,function(result){
        callBack(result);
    });
}
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
    commentDao.findComment({Mark:mark,Type:1},helper,function(result){
        callBack(result);
    });
}

exports.findCommentsByComments = function(mark,toComment,callBack){
    commentDao.findComment({Mark:mark,Type:2,ToComment:toComment},helper,function(result){
        callBack(result);
    });
}
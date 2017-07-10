var helper = require('../DBHelper/helper');
var commentDao = require('../DBSql/commentDao');
var mongoose = require('mongoose');

//增加评论
exports.addComment = function (commentBean,callBack) {
    commentBean._id = new mongoose.Types.ObjectId();
    commentDao.addComment([commentBean],helper,function(result){
        callBack(result);
    });
}

//通过文章mark和destination寻找这篇文章的评论
exports.findCommentsByArticle = function(mark,destination,callBack){
    var conditions = {Mark:mark}
    if(destination!=null){
        conditions.Destination = destination;
    }
    commentDao.findComment(conditions,helper,function(result){
        callBack(result);
    });
}

//同过文章mark和评论寻找（用于用户查看谁回复了自己的评论）
exports.findCommentsByComments = function(mark,toComment,callBack){
    commentDao.findComment({Mark:mark,Type:2,ToComment:toComment},helper,function(result){
        callBack(result);
    });
}

//通过ID寻找评论
exports.findCommentById = function(id,callBack){
    commentDao.findComment({_id:id},helper,function(result){
        callBack(result);
    });
}

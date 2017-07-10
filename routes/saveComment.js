var express = require('express');
var router = express.Router();
var commentService = require('../server/service/commentService');
var articleService = require('../server/service/articleService');

//获取ip
var get_client_ip = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};

router.post('/',function(req,res){
    var comment = {
        UserId:req.session.user._id,
        Mark:req.body.mark,
        FromUser:req.session.user,
        Content:req.body.content,
        Type:req.body.type,
        IsDel:0,
        IsRead:0,
        IsReadAuthor:0,
        IsReadAdmin:0,
        IP:get_client_ip(req),
        Destination:req.body.destination,
        Date:new Date().date2str("yyyy-MM-dd hh:mm:ss")
    }

    //判断是回复帖子还是回复评论
    if(comment.Type==2){
        //回复用户
        var toCommentId = req.body.toCommentId;
        commentService.findCommentById(toCommentId,function(data){
            comment.ToComment = data.result[0];
            commentService.addComment(comment,function(result){
                res.json({success:result.success});
            });
        });
    }else{
        commentService.addComment(comment,null,function(result){
            res.json({success:result.success});
        });
    }

    //TODO 结算给文章加柴(1)还是降雨(2) 如何增加点赞和热度  to test
    if(comment.Destination == 1){
        articleService.addHotUser(comment.Mark,comment.FromUser._id,function(result){
            console.log(result.flag);
        });
    }else{
        articleService.addDownUser(comment.Mark,comment.FromUser._id,function(result){
            console.log(result.flag);
        });
    }



});
module.exports = router;
var express = require('express');
var router = express.Router();
var commentServoce = require('../server/service/commentService');

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
        Date:new Date().date2str("yyyy-MM-dd hh:mm:ss")
    }
    console.log('--'+comment.Mark);
    if(comment.Type==2){
        //回复用户
        console.log('ToComment:'+comment.ToComment);
        comment.ToComment = req.body.toComment;
    }
    commentServoce.addComment(comment,function(result){
        res.json({success:result.success});
    });

});
module.exports = router;
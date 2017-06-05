var express = require('express');
var router = express.Router();
var commentService = require('../server/service/commentService');

router.get('/',function(req,res){
    var mark = req.query.mark;
    commentService.findCommentsByArticle(mark,function(result){
        console.log(result);
        res.json(result);
    });
});

module.exports = router;
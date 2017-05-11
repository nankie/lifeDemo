/**
 * Created by fyf-hey on 2017/4/27.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    //将后台session的user放入前台缓存中
    if(user = req.session.user){
        res.locals.username = user;
    }
    switch (user.Type){
        case 1 :
            res.render('homepage');
            break;
        case 2 :
            res.render('authorpage');
            break;
        case 3 :
            res.render('adminpage');
            break;
        default:break;
    }

});
module.exports = router;

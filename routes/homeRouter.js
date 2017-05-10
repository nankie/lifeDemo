/**
 * Created by fyf-hey on 2017/4/27.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    if(user = req.session.user){
        res.locals.username = user;
    }
    res.render('homepage');
});
module.exports = router;

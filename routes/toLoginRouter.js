/**
 * Created by fyf-hey on 2017/4/26.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('login');
});
module.exports = router;


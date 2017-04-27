/**
 * Created by fyf-hey on 2017/4/27.
 */
var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('homepage');
});
module.exports = router;

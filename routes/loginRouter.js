/**
 * Created by fyf-hey on 2017/4/26.
 */
var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();
var allModel = require('../server/models/allModel');

router.post('/',function(req, res,next){
    userService.loginUser(req.body.username,req.body.password,function (result) {
        res.json({status:result});
    })
});

module.exports = router;

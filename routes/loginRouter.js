/**
 * Created by fyf-hey on 2017/4/26.
 */
var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();
var allModel = require('../server/models/allModel');

router.post('/',function(req, res,next){
    userService.loginUser(req.body.username,req.body.password,function (result) {
        if((flag = result.success) == 1){
            req.session.user = result.user;
        }
        res.json({status:flag});
    })
});

module.exports = router;

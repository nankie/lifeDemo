/**
 * Created by fyf-hey on 2017/4/26.
 */
var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();
var allModel = require('../server/models/allModel');

router.post('/',function(req, res,next){
    userService.loginUser(req.body.username,req.body.password,function (result) {
        switch (result){
            case 1:
                res.redirect('home'); //ok
                break;
            case 2:
                res.json({status:'2'});  //pwd err
                break;
            case 3:
                res.json({status:3});  //no user
                break;
            default:break;
        }
    })
});

module.exports = router;

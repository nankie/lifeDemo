var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // var user = new allModel.userModel(req.body.username,req.body.password);
    userService.checkRegister(username,function(result){
        switch (result){
            case 1:  //ok
                userService.registerUser(username,password,function(result){
                    console.log(result);
                });
                break;
            case 2:  //user exsit
                break;
            default:
                break;
        }
    })

});

module.exports = router;




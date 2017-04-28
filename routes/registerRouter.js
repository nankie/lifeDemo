var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // var user = new allModel.userModel(req.body.username,req.body.password);
    userService.registerUser(username,password,function(result){
        res.json({status:result});
    })

});

module.exports = router;




var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();
/* GET users listing. */
router.post('/', function(req, res) {
    var type = 3;
    var nkm = 'enphy';
    userService.registerUser(req.body.username,req.body.password,nkm,type,function(result){
        res.json({status:result});
    });
});
module.exports = router;




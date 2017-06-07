var express = require('express');
var userService = require('../server/service/userService');
var router = express.Router();
/* GET users listing. */
router.post('/', function(req, res) {
    var type = 2;
    var nkm = 'enphy';
    var userBean = {
        Username:req.body.username,
        Password:req.body.password,
        Nickname:nkm,
        Type:type,
        CrtTime:new Date().date2str("yyyy-MM-dd hh:mm:ss")
    }
    userService.registerUser(userBean,function(result){
        res.json({status:result});
    });
});
module.exports = router;




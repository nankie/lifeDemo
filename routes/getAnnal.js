var express = require('express');
var router = express.Router();
var parser = require('../server/utils/parser');
parser.parse('../assets/xml/1.xml',function(data){
    router.get('/',function(req,res){
        res.json({artical:data});
    });
    module.exports = router;
});
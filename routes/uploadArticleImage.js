var fs = require('fs');
var express = require('express');
var multer = require('multer');
var router = express.Router();

var localName;

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
        //将文件名转换成unicode，防止出现中文
        var nameFlag = escape(file.originalname.split('.')[0]).toLocaleLowerCase().replace(/%u/gi,'u');
        if(nameFlag.length>10){
            nameFlag = nameFlag.substring(0,9);
        }
        console.log(nameFlag);
        localName = Date.now() + '' + parseInt(100000*Math.random()) + nameFlag + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]; //TODO 将文件名汉字转换成非汉字
        callback(null,localName);
    }
});

var upload = multer({ storage: Storage }).array("articleImg", 1); //设置最大上传数量

router.post('/',function(req,res){
    upload(req, res, function (err) {
        if (err) {
            res.json({url:'error'});
        }
        res.json({url:localName});
    });
});
module.exports = router;
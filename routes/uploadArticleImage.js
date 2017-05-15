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
        localName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
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
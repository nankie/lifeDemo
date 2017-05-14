var fs = require('fs');
var express = require('express');
var multer = require('multer');
var router = express.Router();


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("articleImg", 1); //设置最大上传数量

router.post('/',function(req,res){
    console.log('ok');
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        res.json({status:'ok'});
    });
});
module.exports = router;
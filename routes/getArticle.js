var express = require('express');
var router = express.Router();
var xmlreader = require("xmlreader");
var fs = require("fs");

router.get('/' , function(req,res){
    var mark = req.query.mark;
    var articlePath = './public/xml/' + mark + '.xml';
    var articleXml = fs.readFileSync(articlePath,'utf-8');
    console.log(articleXml);
    xmlreader.read(articleXml, function(errors, response){
        if(null !== errors ){
            console.log(errors)
            return;
        }
        var articleObj = response.article;
        console.log( response.article );
        res.render('newsModelPc',{article:articleObj});
    });
});

module.exports = router;
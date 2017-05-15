var express = require('express');
var xmlWriter = require('xml-writer');
var fs = require('fs');
var router = express.Router();
router.post('/',function(req,res){
    var article = req.body.article;
    var xmlPath = './public/xml/foo.xml';
    //TODO 生成新闻ID，以备使用：文件名

    //异步储存xml；
    fs.writeFile(xmlPath, null, function(err){
        if(err) console.log(err);
        var ws = fs.createWriteStream(xmlPath);
        ws.on('close', function() {
            console.log(fs.readFileSync(xmlPath, 'UTF-8'));
        });
        var xw = new xmlWriter(false, function(string, encoding) {
            ws.write(string, encoding);
        });
        xw.startDocument('1.0', 'UTF-8');
        xw.startElement('artical');

        for(var num in article){
            var content = article[num];
            if(content.chapter){
                xw.startElement('content').writeAttribute('type', 'chapter').text(content.chapter).endElement();
            }else if(content.section){
                xw.startElement('content').writeAttribute('type', 'section').text(content.section).endElement();
            }else if(content.image){
                xw.startElement('content').writeAttribute('type', 'image').text(content.image).endElement();
            }
        }
        xw.endElement().endDocument();
        ws.end();
    });

    //TODO 创建数据库文章并保存


});
module.exports = router;
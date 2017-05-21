var express = require('express');
var xmlWriter = require('xml-writer');
var articleService = require('../server/service/articleService');
var fs = require('fs');
var router = express.Router();
router.post('/',function(req,res){
    //TODO 前端页面传参完善
    var article = req.body.article;
    //生成xml随机唯一文件名：时间值+八位随机数.xml
    var xmlName = new Date().getTime() + parseInt(100000000*Math.random()) + '.xml';
    var xmlPath = './public/xml/' + xmlName;

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
        xw.startElement('article');

        //TODO 把文章属性也写入xml中，这样在展示新闻时少一次访问数据库

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

        //创建数据库文章并保存
        var articleBean = {
            AuthorId:req.session.user._id,
            Title:req.body.title,
            IsCopy:req.body.isCopy,
            Type:req.body.type,
            XmlName:xmlName,
            Date:new Date()
        };
        if(articleBean.IsCopy==1){
            articleBean.FromWhere = req.body.fromAuthor;
            articleBean.FromAuthor = req.body.fromAuthor;
        }
        articleService.addArticle(articleBean,function(result){
            if(result.success==1){
                //TODO 成功，生成文章url，并且/user下跳转
                res.json({status:1});
            }else{
                //失败，返回失败消息
                res.json({status:0});
            }

        });

    });
});
module.exports = router;
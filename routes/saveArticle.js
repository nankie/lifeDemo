var express = require('express');
var xmlWriter = require('xml-writer');
var articleService = require('../server/service/articleService');
var fs = require('fs');
var router = express.Router();
router.post('/',function(req,res){
    //创建数据库文章bean
    var articleBean = {
        AuthorId:req.session.user._id,
        Title:req.body.title,
        IsCopy:req.body.isCopy,
        Type:req.body.type,
        Date:new Date()
    };
    if(articleBean.IsCopy==1){
        articleBean.FromWhere = req.body.fromWhere;
        articleBean.FromAuthor = req.body.fromAuthor;
    }
    //获取传入的文章对象
    var article = req.body.article;
    //生成xml随机唯一文件名：时间值+八位随机数.xml
    var mark = new Date().getTime() + '' + parseInt(10000*Math.random())
        + articleBean.AuthorId;

    articleBean.Mark = mark;

    var xmlPath = './public/xml/' + mark + '.xml';

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
        xw.startElement('author').text(req.session.user.Nickname).endElement();
        xw.startElement('title').text(articleBean.Title).endElement();
        xw.startElement('isCopy').text(articleBean.IsCopy).endElement();
        if(articleBean.IsCopy==1){
            xw.startElement('fromWhere').text(articleBean.FromWhere).endElement();
            xw.startElement('fromAuthor').text(articleBean.FromAuthor).endElement();
        }
        xw.startElement('type').text(articleBean.Type).endElement();
        xw.startElement('date').text(articleBean.Date.getTime()).endElement();

        //写入文章内容
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

        //创建数据库文章并保存bean
        articleService.addArticle(articleBean,function(result){
            if(result.success==1){
                //成功，生成文章url，并且/user下跳转
                res.json({result:'getArticle?mark='+mark});
            }else{
                //失败，返回失败消息
                res.json({result:'error'});
            }

        });

    });
});
module.exports = router;
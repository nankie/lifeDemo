var xmlreader = require('xmlreader');
var fs = require("fs");

//../assets/xml/1.xml

exports.parse = function(url,func){
    var data = fs.readFileSync(url,'utf-8');
    xmlreader.read(data, function(errors, response){
        if(null !== errors ){
            console.log(errors);
            return;
        }
        var contents = response.artical.content.array;
        var str = '';
        for(var i in contents){
            if(text = contents[i].text){
                str += '<h4>'+text()+'</h4>';
            }
            if(cha = contents[i].chapter){
                str += '<h2>'+cha.text()+'</h2>';
            }
            if(img = contents[i].image){
                str += '<img src="'+img.text()+'">';
            }
        }
        func(str);

    });
}




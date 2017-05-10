var xmlreader = require('xmlreader');
var fs = require("fs");

var data = fs.readFileSync('assets/xml/test.xml','utf-8');
// console.log(data);
xmlreader.read(data, function(errors, response){
    if(null !== errors ){
        console.log(errors)
        return;
    }
    console.log( response.response.who.array[0].text());
});


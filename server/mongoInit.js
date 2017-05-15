var mongoose = require('mongoose'),
    options = {};
// var connectionString = 'mongodb://test:test@172.16.229.166:27017/life';
var connectionString = 'mongodb://test:test@localhost:27017/life';
options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};
mongoose.connect(connectionString, options, function(err, res) {
    if(err) {
        console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
    } else {
        console.log('[mongoose log] Successfully connected to: ' + connectionString);
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
    // yay!
    console.log('mongoose open success');
});
exports.getDB = function(){
    return db;
}

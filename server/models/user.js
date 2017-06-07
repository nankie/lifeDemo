/**
 * Created by fyf-hey on 2017/4/25.
 */
var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

//schema 就是如何定义数据的结构
var userSchema = new mongoose.Schema({
    Username:{type:String},
    Password:{type:String},
    PersonImg:{type:String},
    Nickname:{type:String},
    Mail:{type:String},
    Mobile:{type:String},
    WXFlag:{type:String},
    Type:{type:Number},
    CrtTime:{type:String}//Date会已ISODate储存，会难以整理并且会慢8个小时。这里统一用 yyyy-mm-dd hh:mm:ss 格式的字符串储存
});
//生成方法getModel给予调用，返回user模型,‘user’传入后为储存的collections - users
exports.getModel = function(){
    var userModel = global.db.model('user',userSchema);
    return userModel;
};
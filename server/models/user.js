/**
 * Created by fyf-hey on 2017/4/25.
 */
var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

//schema 就是如何定义数据的结构
var userSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String}
});
//生成方法getModel给予调用，返回user模型,‘user’传入后为储存的collections - users
exports.getModel = function(){
    var userModel = global.db.model('user',userSchema);
    return userModel;
};
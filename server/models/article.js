/**
 * Created by fyf-hey on 2017/4/25.
 */
var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

//schema 就是如何定义数据的结构
var articleSchema = new mongoose.Schema({

    AuthorId:{type:String},
    Title:{type:String},
    IsCopy:{type:Number},
    FromWhere:{type:String},
    FromAuthor:{type:String},
    Type:{type:String},
    ArticlePath:{type:String},
    Angry:{type:String},
    IsDel:{type:Number},
    DelReason:{type:String},
    IsHot:{type:Number},
    HotReason:{type:String},
    Date:{type:String}
});
//生成方法getModel给予调用，返回user模型,‘user’传入后为储存的collections - users
exports.getModel = function(){
    return global.db.model('article',articleSchema);
};
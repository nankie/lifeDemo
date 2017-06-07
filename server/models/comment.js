/**
 * Created by fyf-hey on 2017/4/25.
 */
var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

//schema 就是如何定义数据的结构
var commentSchema = new mongoose.Schema({
    UserId:{type:String},
    Mark:{type:String},
    FromUser:{type:mongoose.Schema.Types.Mixed },
    Content:{type:String},
    Type:{type:Number},
    ToComment:{type:String},
    IsDel:{type:Number},
    WhyDel:{type:String},
    WhoDel:{type:String},
    IsRead:{type:Number},
    IsReadAuthor:{type:Number},
    IsReadAdmin:{type:Number},
    IP:{type:String},
    Date:{type:String} //Date会已ISODate储存，会难以整理并且会慢8个小时。这里统一用 yyyy-mm-dd hh:mm:ss 格式的字符串储存
});

exports.getModel = function(){
    return global.db.model('comment',commentSchema);
};

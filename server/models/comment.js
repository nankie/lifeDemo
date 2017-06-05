/**
 * Created by fyf-hey on 2017/4/25.
 */
var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

//schema 就是如何定义数据的结构
var commentSchema = new mongoose.Schema({
    UserId:{type:String},
    Mark:{
        type:String,
        ref:'user'
    },
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
    Date:{type:Date}
});

exports.getModel = function(){
    return global.db.model('comment',commentSchema);
};

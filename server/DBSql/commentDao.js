/**
 * Created by fyf-hey on 2017/4/25.
 */
var comment =require('../models/comment');

/**
 * 调用公共add方法并且传入操作数据库的模型user
 * @returns {Function}
 */
exports.addComment = function(conditions,dbHelper,callback) {
    //获取user模型
    var commentModel =comment.getModel();
    dbHelper.addData(commentModel,conditions,function(result) {
        callback(result);
    });
};
exports.findComment = function(conditions,dbHelper,callback){
    var commentModel =comment.getModel();
    var fields   = {};
    var options  = {};
    dbHelper.findData(commentModel,conditions,fields,options,function(result){
        callback(result);
    });
}
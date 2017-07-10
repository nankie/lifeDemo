/**
 * Created by fyf-hey on 2017/4/25.
 */
var article =require('../models/article');

/**
 * 调用公共add方法并且传入操作数据库的模型user
 * @returns {Function}
 */
exports.addArticle = function(conditions,dbHelper,callback) {
    //获取user模型
    var articleModel =article.getModel();
    dbHelper.addData(articleModel,conditions,function(result) {
        callback(result);
    });
};
exports.findArticle = function(conditions,dbHelper,callback){
    var articleModel =article.getModel();
    var fields   = {};
    var options  = {};
    dbHelper.findData(articleModel,conditions,fields,options,function(result){
        callback(result);
    });
}
exports.updateArticle = function (conditions,doc,dbHelper,callback) {
    var commentModel =article.getModel();
    var options  = {};
    dbHelper.updateDate(commentModel,conditions,doc,options,function(result){
        callback(result);
    });
}
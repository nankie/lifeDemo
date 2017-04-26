/**
 * Created by fyf-hey on 2017/4/25.
 */
var user =require('../models/user');

/**
 * 调用公共add方法并且传入操作数据库的模型user
 * @returns {Function}
 */
exports.addUser = function(conditions,dbHelper,callback) {
    //获取user模型
    var userModel =user.getModel();
    dbHelper.addData(userModel,conditions,function(result) {
        callback(result);
    });
};
exports.findUser = function(conditions,dbHelper,callback){
    var userModel =user.getModel();
    var fields   = {};
    var options  = {};
    dbHelper.findData(userModel,conditions,fields,options,function(result){
        callback(result);
    });
}
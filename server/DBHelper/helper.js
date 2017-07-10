/**
 * Created by fyf-hey on 2017/4/25.
 */
/**
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param callback 回调方法
 */
exports.addData = function(model,conditions,callback) {
    model.create(conditions, function(err,result){
        if(err) {
            console.log(err);
            callback({success:0,flag:"save data fail"});
        } else {
            console.log('save success');
            callback({success:1,flag:"save data success"});
        }
    });
}

/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
exports.findData = function(model,conditions,fields,options,callback) {
    model.find(conditions, fields, options, function(error, result){
        if(error) {
            console.log(error);
            callback({success: 0, flag: "find data fail"});
        } else {
            if(result.length!=0){
                console.log('find success!');
                callback({success: 1, flag: "find data success",result:result});
            }
            else{
                console.log('find fail:no this data!');
                callback({success: 404, flag: 'find fail:no this data!'});
            }
        }
    });
}

/**
 * 公共update方法
 * @param model
 * @param conditions
 * @param fields
 * @param options
 * @param callback
 */
exports.updateDate = function(model,conditions,doc,options,callback) {
    model.update(conditions, doc, options, function(error, result){
        if(error) {
            console.log(error);
            callback({success: 0, flag: "update fail"});
        } else {
            console.log('update success!');
            callback({success: 1, flag: 'update success!'});
        }
    });
}
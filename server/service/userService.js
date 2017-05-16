/**
 * Created by fyf-hey on 2017/4/25.
 */
var helper = require('../DBHelper/helper');
var userDao = require('../DBSql/userDao');
var mongoose = require('mongoose');

exports.registerUser = function(usm,pwd,nkme,type,callBack){
    var status = null;
    var userBean = {
        _id:new mongoose.Types.ObjectId(),
        Username:usm,
        Password:pwd,
        Nickname:nkme,
        Type:type
    }
    userDao.findUser({Username:usm},helper,function(result){
        if(result.result == undefined && result.success == 0){
            if(status = 1){        //could register ,register ok
                userDao.addUser([userBean],helper,function(result){
                    if(result.success ==0){
                        status = 3; //register fail
                        callBack(status);
                    }
                });
            };
        }else{
            status = 2; //user exist
        }
        callBack(status);
    });
}

exports.loginUser = function (usm,pwd,callBack) {
    userDao.findUser({Username:usm},helper,function(result){
        var status;
        if(result.result == undefined && result.success == 0){
            status = {success:3};//no such user
        }else{
            var user = result.result[0];
            if(user.Password == pwd){
                status = {success:1, user:user}
                // if(user.Type == 1){
                //     status = {success:1 , user:user};//user login ok
                // }else if(user.Type == 2){
                //     status = {success:2 , user:user}//author login ok
                // }else{
                //     status = {success:3 , user:user}//admin login ok
                // }
            }else{
                status = {success:2}; //password is error
            }
        }
        callBack(status);
    });
}

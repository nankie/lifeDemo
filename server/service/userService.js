/**
 * Created by fyf-hey on 2017/4/25.
 */
var helper = require('../DBHelper/helper');
var userDao = require('../DBSql/userDao');
var mongoose = require('mongoose');
var allModel = require('../models/allModel');

exports.registerUser = function(username,password,callBack){
    var user = new allModel.userModel(new mongoose.Types.ObjectId(),username,password);
    userDao.addUser([user],helper,function(result){
        callBack(result);
    });
}

exports.loginUser = function (username,password,callBack) {
    userDao.findUser({username:username},helper,function(result){
        var status;
        if(result.result == undefined && result.success == 0){
            status = 3;//no such user
        }else{
            var user = result.result[0];
            if(user.password == password){
                status = 1; //login ok
            }else{
                status = 2; //password is error
            }
        }
        callBack(status);
    });
}

exports.checkRegister = function(username,callBack){
    userDao.findUser({username:username},helper,function(result){
        console.log(result);
        var status;
        if(result.result == undefined && result.success == 0){
            status = 1; //can register
        }else{
            status = 2; //user exist
        }
        callBack(status);
    });
}

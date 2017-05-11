/**
 * Created by fyf-hey on 2017/4/25.
 */
exports.userBean = function(id,usm,pwd,nkme,type){
    this._id = id;
    this.Username = usm;
    this.Password = pwd;
    this.PersonImg = '';
    this.Nickname = nkme;
    this.Mail = null;
    this.Mobile = null;
    this.WXFlag = '';
    this.Type = type;
    this.CrtTime = new Date();
}

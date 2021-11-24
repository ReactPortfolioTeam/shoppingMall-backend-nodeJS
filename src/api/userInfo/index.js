const Router = require('koa-router');
const userInfo = new Router();
const userInfoCtrl = require('./userInfo.ctrl');

userInfo.get('/list', userInfoCtrl.getUserInfo); // 회원정보 조회
userInfo.post('/updatePassword', userInfoCtrl.updatePassword); // 비밀번호 변경
userInfo.post('/updateAddress', userInfoCtrl.updateAddress); // 주소 변경
module.exports = userInfo;

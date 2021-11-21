const Router = require('koa-router');
const login = new Router();
const loginCtrl = require('./login.ctrl');

login.post('/', loginCtrl.login);
module.exports = login;

const Router = require('koa-router');
const logout = new Router();
const logoutCtrl = require('./logout.ctrl');

logout.get('/', logoutCtrl.logout);
module.exports = logout;

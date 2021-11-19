const Router = require('koa-router');
const login = new Router();
// const loginCtrl = require('./login.ctrl');

login.get('/', (ctx) => {
  ctx.body = ctx.request.body;
});
// loginCtrl.list
module.exports = login;

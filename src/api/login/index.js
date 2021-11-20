const Router = require('koa-router');
const login = new Router();
const loginCtrl = require('./login.ctrl');

login.get('/', (ctx) => {
  ctx.body = `GET ${ctx.request.path}`;
});
login.post('/localLogin', loginCtrl.login);
module.exports = login;

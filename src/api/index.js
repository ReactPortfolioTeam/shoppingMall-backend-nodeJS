const Router = require('koa-router');
const login = require('./login');
const api = new Router();

api.use('/login', login.routes());

// 라우터를 내보냄
module.exports = api;

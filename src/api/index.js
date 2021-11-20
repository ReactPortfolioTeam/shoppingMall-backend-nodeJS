const Router = require('koa-router');
const login = require('./login');
const logout = require('./logout');
const api = new Router();

api.use('/login', login.routes());
api.use('/logout', logout.routes());

// 라우터를 내보냄
module.exports = api;

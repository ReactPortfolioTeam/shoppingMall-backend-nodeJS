const Router = require('koa-router');
const login = require('./login');
const signup = require('./signup');
const api = new Router();

api.use('/login', login.routes());

api.use('/signup', signup.routes());

// 라우터를 내보냄
module.exports = api;

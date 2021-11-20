const Router = require('koa-router');
const signupCtrl = require('./signup.ctrl');

const signup = new Router();

signup.post('/', signupCtrl.signup);

module.exports = signup;

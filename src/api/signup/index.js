const Router = require('koa-router');
const signupCtrl = require('./signup.ctrl');

const signup = new Router();

signup.post('/', signupCtrl.signup);
signup.get('/check', signupCtrl.check);

module.exports = signup;

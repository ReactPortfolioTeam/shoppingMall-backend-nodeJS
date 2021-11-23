// const Model = require('../../../model/Model');

exports.logout = (ctx) => {
  ctx.session.loggedin = false;
  ctx.body = {
    userState: false,
    message: '로그아웃 되었습니다.',
  };
  console.log('ctx.session.loggedin: ' + ctx.session.loggedin);
};

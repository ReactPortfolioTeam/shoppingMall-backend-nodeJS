// const Model = require('../../../model/Model');

exports.logout = (ctx) => {
  // ctx.request.session.loggedin = false;
  ctx.body = `GET ${ctx.request.path} 로그아웃되었습니다.`;
};

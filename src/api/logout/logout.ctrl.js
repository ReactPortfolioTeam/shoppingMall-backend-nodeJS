exports.logout = (ctx) => {
  ctx.session.loggedin = false;
  ctx.body = {
    userState: ctx.session.loggedin,
    message: '로그아웃 되었습니다.',
  };
  console.log('ctx.session.loggedin: ' + ctx.session.loggedin);
};

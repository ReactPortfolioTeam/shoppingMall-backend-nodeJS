const pool = require('../mysql');

const sql = 'SELECT * FROM user WHERE userid = ? AND password = ?';

exports.login = async (ctx) => {
  const { userid, password } = ctx.request.body;
  let data;
  try {
    data = await pool.query(sql, [userid, password]);
  } catch (error) {
    console.log(error);
  }
  if (userid && password) {
    if (data[0][0]) {
      ctx.status = 200;
      ctx.session.loggedin = true;
      ctx.body = {
        data: data[0][0],
        message: '로그인에 성공하였습니다.',
        userState: ctx.session.loggedin,
        status: ctx.status,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        message: '로그인 정보가 일치하지 않습니다.',
        status: ctx.status,
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      message: '아이디와 비밀번호를 입력해주세요',
      status: ctx.status,
    };
  }
  console.log('ctx.session.loggedin: ' + ctx.session.loggedin);
};

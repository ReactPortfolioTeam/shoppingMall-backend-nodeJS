const { emptyAndRegError, emptyError } = require('../../util/emptyError');
const pool = require('../mysql');

const sql = 'SELECT * FROM user WHERE userid = ? AND password = ?';

exports.login = async (ctx) => {
  const loginModel = {
    userid: '',
    password: '',
  };
  const { userid, password } = ctx.request.body;
  loginModel.userid = userid;
  loginModel.password = password;

  let errorMessage = [];

  emptyError(loginModel, errorMessage);

  if (errorMessage.length > 0) {
    console.log(errorMessage);
    ctx.status = 400;
    ctx.body = {
      msg: errorMessage,
    };
    return;
  }
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
        msg: [{ type: 'password', msg: '로그인 정보가 일치하지 않습니다.' }],
      };
    }
  }
  console.log('ctx.session.loggedin: ' + ctx.session.loggedin);
};

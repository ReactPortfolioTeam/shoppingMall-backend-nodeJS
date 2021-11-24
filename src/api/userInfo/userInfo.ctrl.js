const config = require('../../../config/config.json');
const pool = require('mysql2/promise').createPool({
  host: config.dev.host,
  user: config.dev.user,
  port: config.dev.port,
  password: config.dev.password,
  database: config.dev.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

exports.getUserInfo = async (ctx) => {
  const { userid } = ctx.request.body;
  let data;
  try {
    data = await pool.query('SELECT * FROM user WHERE userid = ?', [userid]);
  } catch (error) {
    console.log(error);
  }
  ctx.body = data[0][0];
  console.log(data[0][0]);
};

exports.updatePassword = async (ctx) => {
  const { userid, prevPassword, nextPassword } = ctx.request.body;
  let data;
  try {
    data = await pool.query('SELECT * FROM user WHERE userid = ?', [userid]);
  } catch (error) {
    console.log(error);
  }
  if (data[0][0].password === prevPassword) {
    await pool.query('UPDATE user SET password = ? WHERE userid = ? ', [
      nextPassword,
      userid,
    ]);
    ctx.status = 200;
    ctx.body = {
      message: '비밀번호가 변경되었습니다.',
      status: ctx.status,
    };
  } else {
    ctx.throw(404, ctx.status + ' : ' + '패스워드가 일치하지 않습니다');
  }
};

exports.updateAddress = async (ctx) => {
  const { userid, nextAddress } = ctx.request.body;
  await pool.query('UPDATE user SET address = ? WHERE userid = ? ', [
    nextAddress,
    userid,
  ]);
  ctx.status = 200;
  ctx.body = {
    message: '주소가 변경되었습니다.',
    status: ctx.status,
  };
};

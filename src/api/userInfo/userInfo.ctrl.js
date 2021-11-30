const { User } = require('../../../model/Model');
const emptyError = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const { findById } = require('../../util/sql');
const pool = require('../mysql');

exports.getUserInfo = async (ctx) => {
  const { userid } = ctx.params;
  let data;
  try {
    data = await pool.query('SELECT * FROM user WHERE userid = ?', [userid]);
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
  ctx.body = data[0][0];
  console.log(data[0][0]);
};

exports.updatePassword = async (ctx) => {
  //   const { userid, prevPassword, nextPassword } = ctx.request.body;
  const user = getModel(
    {
      userid: '',
      prevPassword: '',
      password: '',
    },
    ctx,
  );
  let errorMessage = [];
  let data;
  const userId = getModel(
    {
      userid: '',
    },
    ctx,
  );
  const sql = findById(userId, 'user');
  emptyError.emptyAndRegError(user, errorMessage);
  console.log(errorMessage);
  if (errorMessage.length > 0) {
    ctx.status = 400;
    ctx.body = {
      status: ctx.status,
      msg: errorMessage,
    };
    return;
  }
  try {
    data = await pool.execute(sql);
  } catch (error) {
    console.log(error);
  }
  if (data[0][0].password === user.prevPassword) {
    await pool.query('UPDATE user SET password = ? WHERE userid = ? ', [
      user.password,
      user.userid,
    ]);
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      msg: '비밀번호가 변경되었습니다.',
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      status: ctx.status,
      msg: '비밀번호가 일치하지 않습니다.',
    };
  }
};

exports.updateAddress = async (ctx) => {
  //   const { userid, address } = ctx.request.body;
  const user = getModel(
    {
      userid: '',
      address: '',
    },
    ctx,
  );
  const errorMessage = [];
  emptyError.emptyAndRegError(user, errorMessage);
  console.log(errorMessage);
  if (errorMessage.length > 0) {
    ctx.status = 400;
    ctx.body = {
      status: ctx.status,
      msg: errorMessage,
    };
    return;
  }
  await pool.query('UPDATE user SET address = ? WHERE userid = ? ', [
    user.address,
    user.userid,
  ]);
  ctx.status = 200;
  ctx.body = {
    status: ctx.status,
    msg: '주소가 변경되었습니다.',
  };
};

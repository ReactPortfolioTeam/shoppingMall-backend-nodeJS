/* eslint-disable no-undef */
const { User } = require('../../../model/Model');
const emptyError = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const objectChangeArray = require('../../util/objectChangeArray');
const { insertQuery, findById } = require('../../util/sql');
const pool = require('../mysql');
const getConnection = require('../mysql');

exports.signup = async (ctx) => {
  let data;

  const user = getModel(User, ctx);
  user.join_date = new Date();
  user.level = 'member';

  let errorMessage = [];

  const sql = insertQuery(user, 'user');
  emptyError(user, errorMessage);

  if (errorMessage.length > 0) {
    ctx.status = 400;
    ctx.body = {
      msg: errorMessage,
    };
    return;
  }
  try {
    data = await pool.execute(sql);
  } catch (error) {
    if (error.toString().includes('Duplicate')) {
      ctx.status = 400;
      ctx.body = {
        msg: `중복된 아이디 입니다.`,
      };
      return;
    }
  }
  if (data !== undefined && data[0]) {
    ctx.status = 201;
    ctx.body = {
      msg: `${user.userid}님 환영합니다.`,
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: `에러 발생`,
    };
  }
};

exports.check = async (ctx) => {
  // connection.connection();
  const userId = getModel(
    {
      userid: '',
    },
    ctx,
  );
  const sql = findById(userId, 'user');
  let errorMessage = [];
  emptyError(userId, errorMessage);

  if (errorMessage.length > 0) {
    ctx.status = 400;
    ctx.body = {
      msg: errorMessage,
    };
    return;
  }
  let data;
  try {
    data = await pool.execute(sql);
  } catch (error) {
    console.log(error);
  }
  if (data !== undefined && data[0][0]) {
    ctx.status = 400;
    ctx.body = {
      msg: '중복된 아이디 입니다.',
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      msg: '사용가능한 아이디입니다.',
    };
  }
};

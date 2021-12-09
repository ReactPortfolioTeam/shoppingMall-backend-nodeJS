/* eslint-disable no-undef */
const { User } = require('../../../model/Model');
const { RegUserIdCheck } = require('../../reg/signup');
const { emptyError, emptyAndRegError } = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const objectChangeArray = require('../../util/objectChangeArray');
const { insertQuery, findById } = require('../../util/sql');
const pool = require('../mysql');
const getConnection = require('../mysql');

exports.signup = async (ctx) => {
  let data;
  const User = {
    userid: '',
    password: '',
    email: '',
    name: '',
    address: '',
    join_date: '',
    level: '',
    confirmPw: '',
  };
  const user = getModel(User, ctx);
  user.join_date = 'Now()';
  user.level = 'member';

  let errorMessage = [];

  const sql = insertQuery(user, 'user');

  emptyAndRegError(user, errorMessage);
  if (user.password !== user.confirmPw) {
    errorMessage.push({
      type: 'confirmPw',
      msg: '비밀번호,비밀번호 확인이 같지 않습니다.',
    });
  }

  console.log(errorMessage);
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
  console.log(ctx.params.userid, 'check');
  const userId = {
    userid: ctx.params.userid,
  };
  const sql = findById(userId, 'user');
  let errorMessage = [];
  emptyError(userId, errorMessage);
  RegUserIdCheck(userId.userid, errorMessage);
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
      msg: [
        {
          type: 'userid',
          msg: '중복된 아이디 입니다.',
        },
      ],
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      msg: '사용가능한 아이디입니다.',
    };
  }
};

/* eslint-disable no-undef */
const { User } = require('../../../model/Model');
const emptyError = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const objectChangeArray = require('../../util/objectChangeArray');
const getConnection = require('../mysql');

exports.signup = (ctx) => {
  // connection.connection();

  const user = getModel(User, ctx);

  user.join_date = new Date();
  user.level = 'member';

  let errorMessage = [];

  const sql =
    'INSERT INTO user(userid,password,email,name,address,join_date,level) VALUES(?,?,?,?,?,?,?)';

  emptyError(user, errorMessage);
  if (errorMessage.length > 0) {
    ctx.status = 400;

    ctx.body = {
      msg: errorMessage,
    };
  } else {
    getConnection((conn) => {
      conn.execute(sql, objectChangeArray(user), (err, results, fields) => {
        console.log(err);
        console.log(results);
        console.log(fields);
      });
      conn.release();
    });
    ctx.status = 201;
    ctx.body = {
      msg: user.userid + '님의 회원가입에 성공하였습니다.',
    };
  }
  console.log(ctx.response, 'signup 실행');
};

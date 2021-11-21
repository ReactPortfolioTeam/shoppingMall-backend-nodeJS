/* eslint-disable no-undef */
const { User } = require('../../../model/Model');
const emptyError = require('../../util/emptyError');
const getModel = require('../../util/getModel');
const objectChangeArray = require('../../util/objectChangeArray');
const { insertQuery, findById } = require('../../util/sql');
const getConnection = require('../mysql');

exports.signup = (ctx) => {
  // connection.connection();

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

  getConnection((conn) => {
    conn.execute(sql, (error, results, fields) => {
      if (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          msg: '중복된 아이디 입니다.',
        };
      } else if (results) {
        console.log(results);
        console.log(fields);
        ctx.status = 201;
        ctx.body = {
          msg: `${user.userid}님 환영합니다.`,
        };
      }
    });
    // .then((res) => {
    //   ctx.status = 201;
    //   ctx.body = {
    //     msg: `${user.userid}님 환영합니다.`,
    //   };
    //   return true;
    // })
    // .catch((err) => {
    //   ctx.status = 400;
    //   ctx.body = {
    //     msg: '중복된 아이디 입니다.',
    //   };
    //   return false;
    // });
    // if (result) {
    //   console.log('here');
    //   ctx.status = 201;
    //   ctx.body = {
    //     msg: `${user.userid}님 환영합니다.`,
    //   };
    // } else {
    //   console.log('here1');
    //   ctx.status = 400;
    //   ctx.body = {
    //     msg: '중복된 아이디 입니다.',
    //   };
    // }
    conn.release(); //
  });
  console.log(ctx.response);
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
  console.log(sql);
  if (errorMessage.length > 0) {
    ctx.status = 400;

    ctx.body = {
      msg: errorMessage,
    };
  } else {
    const result = await getConnection((err, conn) => {
      conn
        .promise()
        .query(sql)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log('here3');
      conn.release(); //
    });
    console.log('here4');
    console.log(result, 'result');
  }
  await console.log(ctx.response, 'signup 실행');
};

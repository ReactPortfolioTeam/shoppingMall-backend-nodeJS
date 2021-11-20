const mysql = require('mysql2');
const config = require('../../../config/config.json');

const connection = mysql.createConnection({
  host: config.dev.host,
  user: config.dev.user,
  port: config.dev.port,
  password: config.dev.password,
  database: config.dev.database,
});

exports.login = (ctx) => {
  const { userid, password } = ctx.request.body;
  if (userid && password) {
    if (userid && password) {
      connection.query(
        `SELECT * FROM user WHERE userid = "${userid}" AND password = "${password}"`,
        [userid, password],
        function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            // ctx.request.session.loggedin = true; jwt 토큰 적용? 로그인과 로그아웃 상태를 구분하는?
            // ctx.request.session.userid = userid;
            ctx.response.redirect('/'); // 메인페이지로 이동
            console.log(results);
          } else {
            console.log('로그인 정보가 일치하지 않습니다.');
          }
        },
      );
    } else {
      console.log('아이디와 비밀번호를 입력해주세요.');
    }
  }
};

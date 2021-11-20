const mysql = require('mysql2');
const config = require('../../config/config.json');

// const connection = mysql.createConnection({
//   host: config.dev.host,
//   user: config.dev.user,
//   port: config.dev.port,
//   password: config.dev.password,
//   database: config.dev.database,
// });

const pool = mysql.createPool({
  host: config.dev.host,
  user: config.dev.user,
  port: config.dev.port,
  password: config.dev.password,
  database: config.dev.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// connection.connect(); // 연결

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;

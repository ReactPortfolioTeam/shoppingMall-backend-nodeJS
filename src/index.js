const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const api = require('./api');

const mysql = require('mysql2');
const config = require('../config/config.json');

const connection = mysql.createConnection({
  host: config.dev.host,
  user: config.dev.user,
  port: config.dev.port,
  password: config.dev.password,
  database: config.dev.database,
});

connection.connect(); // 연결

connection.query('select * from user', (err, rows, fields) => {
  if (err) throw err;
  console.log('User info is ...');
  console.table(rows);
});

connection.end();

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

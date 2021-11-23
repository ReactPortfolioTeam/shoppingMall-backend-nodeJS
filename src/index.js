const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const api = require('./api');

const koa_session = require('koa-session');
const session_config = {
  Key: 'koa: sess',
  Maxage: 4000,
  Autocommit: true,
  Overwrite: true,
  Httponly: true,
  Signed: true,
  Rolling: true,
  Renew: false,
};
exports.session = koa_session(session_config, app);
app.keys = ['secretKey'];

router.use('/api', api.routes());

app.use(bodyParser()).use(this.session);

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

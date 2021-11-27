const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
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

app.use(cors());

//  By.Juhan app.use(cors())  cors 에러 허용 지금 방식은 전체허용이기에 좋지 않음
//  app.use(cors({origin:'허용할 주소'}))

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

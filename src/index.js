const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'testing';
});
router.get('/login', (ctx) => {
  ctx.body = 'testing login';
});

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

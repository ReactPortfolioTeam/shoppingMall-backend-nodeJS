const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.ctrl');

order.post('/', orderCtrl.order);
order.get('/:userid/:orderId', orderCtrl.orderConfirm);

module.exports = order;

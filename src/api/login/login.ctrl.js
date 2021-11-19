const Model = require('../../../model/Model');

const UserInfo = Model.User;
UserInfo.userid = 'dhchun1203';

exports.write = (ctx) => {
  //
};

exports.list = (ctx) => {
  ctx.body = UserInfo.userid;
};

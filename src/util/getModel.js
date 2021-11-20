module.exports = function getModel(Model, ctx) {
  // by.Junhan 리퀘스트 바디 안의 값을 모델에 맞게 넣어주는 메소드  11.20
  for (const item in Model) {
    Model[item] = ctx.request.body[item];
  }

  return Model;
};

module.exports = function emptyError(Model, errorMessageArray) {
  // by.Junhan 빈값이 존재할경우 msg 를 반환하는 메소드  11.20
  for (const key in Model) {
    if (Model[key] === '' || Model[key] === undefined) {
      errorMessageArray.push({
        type: key,
        msg: key + '값을 입력해주세요.',
      });
    }
  }
};

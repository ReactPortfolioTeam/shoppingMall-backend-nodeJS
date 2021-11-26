const reg = require('../reg/signup');

module.exports.emptyError = (Model, errorMessageArray) => {
  // by.Junhan 빈값이 존재할경우 msg 를 반환하는 메소드  11.20
  for (const key in Model) {
    if (
      Model[key] === '' ||
      Model[key] === undefined ||
      (typeof Model[key] === 'object' && Model[key].length === 0)
    ) {
      errorMessageArray.push({
        type: key,
        msg: key + '값을 입력해주세요.',
      });
    }
  }
};

module.exports.emptyAndRegError = (Model, errorMessageArray) => {
  // by.Junhan 빈값이 존재할경우 + 정규식이 올바르지 않은 경우 msg 를 반환하는 메소드  11.20
  for (const key in Model) {
    if (key === 'userid') {
      reg.RegUserIdCheck(Model[key], errorMessageArray);
    } else if (key === 'password') {
      reg.RegPasswordCheck(Model[key], errorMessageArray);
    } else if (key === 'email') {
      reg.RegEmailCheck(Model[key], errorMessageArray);
    } else if (key === 'tel') {
      reg.RegTelCheck(Model[key], errorMessageArray);
    } else if (key === 'address') {
      reg.RegAddressCheck(Model[key], errorMessageArray);
    }
    if (
      Model[key] === '' ||
      Model[key] === undefined ||
      (typeof Model[key] === 'object' && Model[key].length === 0)
    ) {
      errorMessageArray.push({
        type: key,
        msg: key + '값을 입력해주세요.',
      });
    }
  }
};

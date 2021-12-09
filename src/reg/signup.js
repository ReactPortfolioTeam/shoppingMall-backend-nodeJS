/* eslint-disable no-useless-escape */
const RegOnlyEngAndNum = '^[a-zA-Z0-9]+$';
const RegEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

const RegTel = '/d{3}-d{4}-d{4}/';

const RegAddress =
  /(([가-힣A-Za-z·\d~\-\.]{2,}(로|길).[\d]+)|([가-힣A-Za-z·\d~\-\.]+(읍|동)\s)[\d]+)/;

module.exports.RegUserIdCheck = (userId, errorMessageArray) => {
  const regdex = new RegExp(RegOnlyEngAndNum);
  if (regdex.test(userId) && userId.length >= 8 && userId.length <= 15) {
    return true;
  } else {
    if (errorMessageArray)
      errorMessageArray.push({
        type: 'userid',
        msg: 'userid 값이 올바르지 않습니다.',
      });
    return false;
  }
};
module.exports.RegPasswordCheck = (password, errorMessageArray, isConfirm) => {
  const regdex = new RegExp(RegOnlyEngAndNum);
  const string = isConfirm ? 'confirmPw' : 'password';
  if (regdex.test(password) && password.length >= 6 && password.length <= 15) {
    return true;
  } else {
    if (errorMessageArray)
      errorMessageArray.push({
        type: string,
        msg: `${string} 값이 올바르지 않습니다.`,
      });
    return false;
  }
};
module.exports.RegEmailCheck = (email, errorMessageArray) => {
  const regdex = new RegExp(RegEmail);
  if (regdex.test(email)) {
    return true;
  } else {
    if (errorMessageArray)
      errorMessageArray.push({
        type: 'email',
        msg: 'email 값이 올바르지 않습니다.',
      });
    return false;
  }
};
module.exports.RegTelCheck = (tel, errorMessageArray) => {
  const regdex = new RegExp(RegTel);
  if (regdex.test(tel)) {
    return true;
  } else {
    if (errorMessageArray)
      errorMessageArray.push({
        type: 'tel',
        msg: '전화번호 값이 올바르지 않습니다.',
      });
    return false;
  }
};

module.exports.RegAddressCheck = (address, errorMessageArray) => {
  const regdex = new RegExp(RegAddress);
  if (regdex.test(address)) {
    return true;
  } else {
    if (errorMessageArray)
      errorMessageArray.push({
        type: 'address',
        msg: '주소 형식이 올바르지 않습니다. "디지털로30길 28" 과 같은 도로명 주소나 "구로동 222-12"와 같은 지번 주소로 입력해주세요.',
      });
    return false;
  }
};

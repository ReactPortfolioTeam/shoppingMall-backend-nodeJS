module.exports = function objectChangeArray(Object) {
  // by.Junhan 오브젝트 순서대로 배열에 값만 넣어주는 메소드  11.20
  let result = [];
  for (const item in Object) {
    result.push(Object[item]);
  }
  return result;
};

module.exports = function objectChangeArray(Object) {
  let result = [];
  for (const item in Object) {
    result.push(Object[item]);
  }
  return result;
};

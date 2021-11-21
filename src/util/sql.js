module.exports.insertQuery = (Model, tableName) => {
  // by.Junhan Model에 맞춰 insert 구문을 생성해주는 메소드 11.21
  let result = 'INSERT INTO ';

  var tableQuery = `${tableName}(`;
  var valueQuery = ' VALUES(';
  for (const item in Model) {
    tableQuery += `${item},`;
    valueQuery += `"${Model[item]}",`;
  }

  tableQuery = tableQuery.slice(0, -1);
  valueQuery = valueQuery.slice(0, -1);
  tableQuery += ')';
  valueQuery += ')';

  result = result + tableQuery + valueQuery;
  return result;
};

module.exports.findById = (Model, tableName) => {
  // by.Junhan Model 값에 맞춰 조건을 검색해주는 메소드 11.21
  let result = `Select * from ${tableName} where `;
  let whereQuery = '';
  for (const item in Model) {
    if (whereQuery !== '') {
      whereQuery += ' AND ';
    }
    whereQuery += `${item} = "${Model[item]}"`;
  }
  return result + whereQuery;
};

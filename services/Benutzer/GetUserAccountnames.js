const db = require('../db');

async function GetUserAccountnames(){
  var sql = 'SELECT `Accountname` FROM `Benutzer`;';
  const result = await db.query(sql);
  return (result);
}

module.exports = {
  GetUserAccountnames
}
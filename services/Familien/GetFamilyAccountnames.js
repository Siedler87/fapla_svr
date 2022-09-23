const db = require('../db');

async function GetFamilyAccountnames(){
  var sql = 'SELECT `Accountname` FROM `Familien`;';
  const result = await db.query(sql);
  return (result);
}

module.exports = {
  GetFamilyAccountnames
}
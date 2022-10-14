const db = require('../db');

async function GetUserAllPictures(){
  var sql = 'SELECT `BildID`, `Pfad` FROM `Bilder`;';
  const result = await db.query(sql);
  return (result);
}

module.exports = {
  GetUserAllPictures
}
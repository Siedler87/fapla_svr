const db = require('../db');

async function GetLoginFamily(GetLoginFamily){

  var sql = 'SELECT `Passwort` FROM `Familien` WHERE `Accountname` = ?;';
  const result = await db.query(sql, [GetLoginFamily.accountname.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (result[0].Passwort == GetLoginFamily.passwort.trim()){
      let message = 'Login_sucess';
      return {message};
  } else {
    let message = 'Password_wrong';
    return {message};
  }
}

module.exports = {
  GetLoginFamily
}
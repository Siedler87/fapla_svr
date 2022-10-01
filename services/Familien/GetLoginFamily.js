const db = require('../db');

async function GetLoginFamily(GetLoginFamily){

  var sql = 'SELECT `Passwort` FROM `Familien` WHERE `Accountname` = ?;';
  const ergebnis = await db.query(sql, [GetLoginFamily.accountname.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnis == null || ergebnis === undefined) {
    let message = 'Account_not_found';
    return {message};
  } else {
    if (ergebnis[0].Passwort == GetLoginFamily.passwort.trim()){
        let message = 'Login_success';
        return {message};
    } else {
      let message = 'Password_wrong';
      return {message};
    }
  }
}

module.exports = {
  GetLoginFamily
}
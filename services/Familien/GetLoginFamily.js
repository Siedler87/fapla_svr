const db = require('../db');

async function GetLoginFamily(GetLoginFamily){

  var sql = 'SELECT `FamID`, `Familienname`, `Passwort`,`BildID` FROM `Familien` WHERE `Accountname` = ?;';
  const ergebnis = await db.query(sql, [GetLoginFamily.accountname.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnis.length < 1) {
    let message = 'Account_not_found';
    return {message};
  } else {
    if (ergebnis[0].Passwort == GetLoginFamily.passwort.trim()){
      let message = 'Login_success';
      let famid = ergebnis[0].FamID;
      let familienname = ergebnis[0].Familienname;
      let bildid = ergebnis[0].BildID;
      return {message, famid, familienname, bildid};
    } else {
      let message = 'Password_wrong';
      return {message};
    }
  }
}

module.exports = {
  GetLoginFamily
}
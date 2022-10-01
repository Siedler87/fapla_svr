const db = require('../db');

async function GetLoginUser(GetLoginUser){

  // current date

  console.log("Objekt: "+GetLoginUser);
  console.log("Accountname: "+GetLoginUser.accountname.trim());
  console.log("Passwort: "+GetLoginUser.passwort.trim());
  let CurrentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = 'SELECT `Passwort` FROM `Benutzer` WHERE `Accountname` = "?";';
  const result = await db.query(sql, [GetLoginUser.accountname.trim()], function (err, result) {
    if (err) {
      console.log(err);
      let message = 'Error';
      return {message};
    };
  });
  if (result == null) {
    console.log("Account nicht gefunden");
    let message = 'Account_not_found';
    return {message};
  } else {

    console.log("Passwort in DB: "+result[0].Passwort);
    if (result[0].Passwort == GetLoginUser.passwort.trim()){
        var sql = 'UPDATE `Benutzer` SET `LetzterLogin`=? WHERE `Accountname`="?"';
        const subresult = await db.query(sql, [CurrentTimestamp, GetLoginUser.accountname.trim()], function (err, result) {
          if (err) {
            let message = 'Error';
            
            return {message};
          };
        });
        let message = 'Login_success';
        return {message};
    } else {
      let message = 'Password_wrong';
      return {message};
    }
  }
  
}

module.exports = {
  GetLoginUser
}
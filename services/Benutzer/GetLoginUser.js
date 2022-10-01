const db = require('../db');

async function GetLoginUser(GetLoginUser){

  // current date

  console.log("Accountname: "+GetLoginUser.accountname.trim());
  console.log("Passwort: "+GetLoginUser.passwort.trim());
  let CurrentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = 'SELECT `Passwort` FROM `Benutzer` WHERE `Accountname` =  ?;';
  console.log(sql+GetLoginUser.accountname.trim());
  console.log("führe SQL gleich aus");
  const ergebnis = await db.query(sql, [GetLoginUser.accountname.trim()], function (err, result) {
    console.log("SQL gestartet");
    if (err) {
      console.log(err);
      let message = 'Error';
      return {message};
    };
  });
    console.log("Ergebnis: "+ergebnis);
    console.log("Ergebnis: "+ergebnis[0]);
    if (ergebnis) {
      console.log("Account nicht gefunden");
      let message = 'Account_not_found';
      return {message};
    } else {
  
      console.log("Passwort in DB: "+ergebnis[0].Passwort);
      if (ergebnis[0].Passwort == GetLoginUser.passwort.trim()){
          var sql = 'UPDATE `Benutzer` SET `LetzterLogin`=? WHERE `Accountname`=?';
          const subresult = db.query(sql, [CurrentTimestamp, GetLoginUser.accountname.trim()], function (err, result) {
            if (err) {
              let message = 'Error';
              console.log(message);
              return {message};
            };
            let message = 'Login_success';
            console.log(message);
            return {message};
          });

      } else {
        let message = 'Password_wrong';
        console.log(message);
        return {message};
      }
    }
  console.log("nach SQL Klammer");
  
}

module.exports = {
  GetLoginUser
}
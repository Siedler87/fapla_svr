const db = require('../db');

async function GetLoginUser(GetLoginUser){

  // current date

  let CurrentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = 'SELECT `BenID`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `Hintergrundfarbe`, `BildID` FROM `Benutzer` WHERE `Accountname` =  ?;';
  const ergebnis = await db.query(sql, [GetLoginUser.accountname.trim()], function (err, result) {
    if (err) {
      console.log(err);
      let message = 'Error';
      return {message};
    };
  });
    if (ergebnis.length < 1)  {
      let message = 'Account_not_found';
      return {message};
    } else {
      if (ergebnis[0].Passwort == GetLoginUser.passwort.trim()){
          var sql = 'UPDATE `Benutzer` SET `LetzterLogin`=? WHERE `Accountname`=?';
          const subresult = await db.query(sql, [CurrentTimestamp, GetLoginUser.accountname.trim()], function (err, result) {
            if (err) {
              let message = 'Error';
              return {message};
            };
          });
          let message = 'Login_success';
          let benid = ergebnis[0].BenID;
          let vorname = ergebnis[0].Vorname;
          let nachname = ergebnis[0].Nachname;
          let geburtstdatum = ergebnis[0].Geburtsdatum;
          let email = ergebnis[0].Email;
          let hintergrundfarbe = ergebnis[0].Hintergrundfarbe;
          let bildid = ergebnis[0].BildID;
          return {message, benid, vorname, nachname, geburtstdatum, email, hintergrundfarbe, bildid};

      } else {
        let message = 'Password_wrong';
        return {message};
      }
    }
  
}

module.exports = {
  GetLoginUser
}
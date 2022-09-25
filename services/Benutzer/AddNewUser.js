const db = require('../db');

async function AddNewUser(AddNewUser){

  // current date
  let CurrentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  var sql = 'INSERT INTO Benutzer (`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `LetzterLogin`, `Hintergrundfarbe`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
  const result = await db.query(sql, [AddNewUser.accountname.trim(), AddNewUser.vorname.trim(), AddNewUser.nachname.trim(), AddNewUser.geburtsdatum.trim(), AddNewUser.email.trim(), AddNewUser.passwort.trim(), CurrentTimestamp, AddNewUser.hintergrundfarbe.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  
  });
  if (result.affectedRows) {
    var sql = 'SELECT `BenID` FROM `Benutzer` WHERE `Accountname` = ?';
    const result = await db.query(sql, [AddNewUser.accountname.trim()], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    return (result[0].BenID);
    
  }
}

module.exports = {
  AddNewUser
}
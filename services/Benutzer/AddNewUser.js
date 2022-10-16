const db = require('../db');

async function AddNewUser(AddNewUser){

  // current date
  let CurrentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let ergebnishaupt = false;
  let ergebnisneben = false;

  if (AddNewUser.email != null && AddNewUser.passwort != null && AddNewUser.email != undefined && AddNewUser.passwort != undefined){
    var sql = 'INSERT INTO Benutzer (`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `LetzterLogin`, `Hintergrundfarbe`, `BildID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )';
    ergebnishaupt = await db.query(sql, [AddNewUser.accountname.trim(), AddNewUser.vorname.trim(), AddNewUser.nachname.trim(), AddNewUser.geburtsdatum.trim(), AddNewUser.email.trim(), AddNewUser.passwort.trim(), CurrentTimestamp, AddNewUser.hintergrundfarbe.trim(), '1'], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
  } else {
    var sql = 'INSERT INTO Benutzer (`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `BildID`) VALUES (?, ?, ?, ?, ?)';
    ergebnisneben = await db.query(sql, [AddNewUser.accountname.trim(), AddNewUser.vorname.trim(), AddNewUser.nachname.trim(), AddNewUser.geburtsdatum.trim(), '1'], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    
  }
  if (ergebnishaupt.affectedRows || ergebnisneben.affectedRows) {
    var sql = 'SELECT `BenID` FROM `Benutzer` WHERE `Accountname` = ?';
    const ergebnisben = await db.query(sql, [AddNewUser.accountname.trim()], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnisneben.affectedRows){
      var sql = 'INSERT INTO `FamilienBenutzer`(`FamID`, `BenID`) VALUES (?,?)';
      const ergebnisfamben = await db.query(sql, [AddNewUser.famid, ergebnisben[0].BenID], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      var sql = 'INSERT INTO `BenutzerAltersstufen`(`BenID`, `AlsID`) VALUES (?,?)';
      const ergebnisbenalt = await db.query(sql, [ergebnisben[0].BenID, '2'], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });

    }
    return (ergebnisben[0].BenID);
  }
}


module.exports = {
  AddNewUser
}
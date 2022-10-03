const db = require('../db');

async function UpdateUser(UpdateUser){

  // Hauptbenutzer aktualisieren
  // Vorname, Nachname, Geburtsdatum, Email
  if (UpdateUser.benid != null && UpdateUser.vorname != null && UpdateUser.nachname != null && UpdateUser.geburtsdatum != null && UpdateUser.email != null) {
    var sql = 'UPDATE `Benutzer` SET `Vorname` = ?, `Nachname` = ? , `Geburtsdatum` = ?, `Email` = ?  WHERE `BenID`= ?) VALUES (?, ?, ?, ?, ?);';
    const ergebnis = await db.query(sql, [UpdateUser.vorname.trim(), UpdateUser.nachname.trim(), UpdateUser.geburtsdatum.trim(), UpdateUser.email.trim(), UpdateUser.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'SELECT `BenID`,`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `Hintergrundfarbe`, `BildID` FROM `Benutzer` WHERE `BenID`= ?;';
      const subergebnis = await db.query(sql, [UpdateUser.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Update_success';
      let benid = subergebnis[0].BenID;
      let accountname = subergebnis[0].accountname;
      let vorname = subergebnis[0].Vorname;
      let nachname = subergebnis[0].Nachname;
      let geburtsdatum = subergebnis[0].Geburtsdatum;
      let email = subergebnis[0].Email;
      let hintergrundfarbe = subergebnis[0].Hintergrundfarbe;
      let bildid = subergebnis[0].BildID;
      return {message, benid, accountname, vorname, nachname, geburtsdatum, email, hintergrundfarbe, bildid};
    }  
  } 
  if (UpdateUser.benid != null && UpdateUser.passwort != null){
      var sql = 'SELECT `Passwort` FROM `Benutzer` WHERE `BenID` =  ?;';
      const ergebnis = await db.query(sql, [UpdateUser.benid], async function (err, result) {
        if (err) {
          console.log(err);
          let message = 'Error';
          return {message};
        };
      
        if (ergebnis.length < 1)  {
          let message = 'Account_not_found';
          return {message};
        } else {
          if (ergebnis[0].Passwort == UpdateUser.passwort.trim()){
              var sql = 'UPDATE `Benutzer` SET `Passwort`=? WHERE `BenID`=?';
              const subergebnis = await db.query(sql, [UpdateUser.passwort.trim(), UpdateUser.benid], function (err, result) {
                if (err) {
                  let message = 'Error';
                  return {message};
                };
              });
              if (subergebnis.affectedRows)  {
                let message = 'Update_success';
                return {message};
              }
              } else {
                let message = 'Password_wrong';
                return {message};
              }
          }  
        });
  } 
  // Nebenbenutzer aktualisieren
  // Vorname, Nachname, Geburtsdatum - keine Email!
  if (UpdateUser.benid != null && UpdateUser.vorname != null && UpdateUser.nachname != null && UpdateUser.geburtsdatum != null && UpdateUser.email == null) {
    var sql = 'UPDATE `Benutzer` SET `Vorname` = ?, `Nachname` = ? , `Geburtsdatum` = ? WHERE `BenID`= ?) VALUES (?, ?, ?, ?, ?);';
    const ergebnis = await db.query(sql, [UpdateUser.vorname.trim(), UpdateUser.nachname.trim(), UpdateUser.geburtsdatum.trim(), UpdateUser.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'SELECT `BenID`, `Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Hintergrundfarbe`, `BildID` FROM `Benutzer` WHERE `BenID`= ?;';
      const subergebnis = await db.query(sql, [UpdateUser.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Update_success';
      let benid = subergebnis[0].BenID;
      let accountname = subergebnis[0].accountname;
      let vorname = subergebnis[0].Vorname;
      let nachname = subergebnis[0].Nachname;
      let geburtsdatum = subergebnis[0].Geburtsdatum;
      let hintergrundfarbe = subergebnis[0].Hintergrundfarbe;
      let bildid = subergebnis[0].BildID;
      return {message, benid, accountname, vorname, nachname, geburtsdatum, hintergrundfarbe, bildid};
    }  
  }

  // bei falschen Parameten
  if ((UpdateUser.benid == null ) || (UpdateUser.nachname == null && UpdateUser.vorname  == null && UpdateUser.geburtsdatum == null && UpdateUser.email == null && UpdateUser.passwort == null)){
    let message = 'Keine_Parameter';
    return {message};
  }

  }

module.exports = {
  UpdateUser
}
const db = require('../db');

async function DeleteUser(DeleteUser){

  if (DeleteUser.benid != null && DeleteUser.passwort != null && DeleteUser.aktion === 'hauptaccountloeschen'){
    var sql = 'SELECT `Passwort` FROM `Benutzer` WHERE `BenID` =  ?';
    const ergebnis = await db.query(sql, [DeleteUser.benid], async function (err, result) {
      if (err) {
        console.log(err);
        let message = 'Error';
        return {message};
      };
    })
      if (ergebnis.length < 1)  {
        let message = 'Account_not_found';
        return {message};
      } else {
        if (ergebnis[0].Passwort == DeleteUser.passwort.trim()){

          var sql = 'delete `BenutzerAltersstufen`, `BenutzerGruppen`, `BenutzerTermine`, `FamilienBenutzer`, `Hauptmenuerechte`, `FamilienAdmin` from `Benutzer` LEFT JOIN `BenutzerAltersstufen` ON `BenutzerAltersstufen`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `BenutzerGruppen` ON `BenutzerGruppen`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `BenutzerTermine` ON `BenutzerTermine`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `FamilienBenutzer` ON `FamilienBenutzer`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `Hauptmenuerechte` ON `Hauptmenuerechte`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `FamilienAdmin` ON `FamilienAdmin`.`BenID`  = `Benutzer`.`BenID` where `Benutzer`.`BenID` = ?';
          const vorergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
            if (err) {
              let message = 'Error';
              return {message};
            };
          });
            var sql = 'DELETE FROM `Benutzer` WHERE `BenID`= ?';
            const ergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
              if (err) {
                let message = 'Error';
                return {message};
              };
            });
            if (ergebnis.affectedRows) {
              var sql = 'SELECT 1 FROM `Benutzer` WHERE `BenID`= ?';
              const subergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
                if (err) {
                  let message = 'Error';
                  return {message};
                };
              });
              if (subergebnis.length < 1)  {
                let message = 'Delete_success';
                return {message};
              } else {
                let message = 'Delete_fail';
                return {message};
              }
            } else {
              let message = 'Account_not_found';
              return {message};
            }  
        } else {
          let message = 'Password_wrong';
          return {message};
        }

      }

  } 
  if (DeleteUser.benid != null && DeleteUser.aktion === 'nebenaccountloeschen'){

    var sql = 'delete `BenutzerAltersstufen`, `BenutzerGruppen`, `BenutzerTermine`, `FamilienBenutzer`, `Hauptmenuerechte`, `FamilienAdmin` from `Benutzer` LEFT JOIN `BenutzerAltersstufen` ON `BenutzerAltersstufen`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `BenutzerGruppen` ON `BenutzerGruppen`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `BenutzerTermine` ON `BenutzerTermine`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `FamilienBenutzer` ON `FamilienBenutzer`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `Hauptmenuerechte` ON `Hauptmenuerechte`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `FamilienAdmin` ON `FamilienAdmin`.`BenID`  = `Benutzer`.`BenID` where `Benutzer`.`BenID` = ? AND `Benutzer`.`Passwort` is null AND `Benutzer`.`Email` is null';
    const vorergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });

    var sql = 'DELETE FROM `Benutzer` WHERE `BenID`= ?';
    const ergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'SELECT 1 FROM `Benutzer` WHERE `BenID`= ?';
      const subergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      if (subergebnis.length < 1)  {
        let message = 'Delete_success';
        return {message};
      } else {
        let message = 'Delete_fail';
        return {message};
      }
    } else {
      let message = 'Account_not_found';
      return {message};
    } 
  }

}
module.exports = {
  DeleteUser
}
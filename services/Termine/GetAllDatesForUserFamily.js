const db = require('../db');

async function GetAllDatesForUserFamily(GetAllDatesForUserFamily){
  if ((GetAllDatesForUserFamily.benid != undefined && GetAllDatesForUserFamily.benid != null) || (GetAllDatesForUserFamily.famid != undefined && GetAllDatesForUserFamily.famid != null)){
    if (GetAllDatesForUserFamily.benid == undefined || GetAllDatesForUserFamily.benid == null) { GetAllDatesForUserFamily.benid = 0; }
    if (GetAllDatesForUserFamily.famid == undefined || GetAllDatesForUserFamily.famid == null) { GetAllDatesForUserFamily.famid = 0; }
    var sql = 'SELECT `Benutzer`.`BenID` FROM `Benutzer`  where `Benutzer`.`BenID` = ?';
    const vorergebnis = await db.query(sql, [GetAllDatesForUserFamily.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (vorergebnis.length < 1) {
      let message = 'Acc_not_found';
      return {message};
    } else {
      var sql = 'SELECT IFNULL(`BenutzerTermine`.`BenID`, `FamilienBenutzer`.`BenID`) AS BenID, `Termine`.`TerID`, `Termine`.`Titel`, `Termine`.`Beschreibung`, `Termine`.`Start`, `Termine`.`Ende`, `Termine`.`Erinnerung`, `Terminarten`.`Wiederholung`, `Terminarten`.`WdhAlleXTage`, `Terminarten`.`WdhAlleXWochen`,`Terminarten`.`WdhAlleXMonate`, `Verantwortlichkeiten`.`Kuerzel`, `Icons`.`Pfad` FROM `Termine` LEFT JOIN `FamilienTermine` on `FamilienTermine`.`TerID` = `Termine`.`TerID` LEFT JOIN `BenutzerTermine` ON `BenutzerTermine`.`TerID` = `Termine`.`TerID` LEFT JOIN `Verantwortlichkeiten` on `Verantwortlichkeiten`.`VerID` = `BenutzerTermine`.`VerID` LEFT JOIN `FamilienBenutzer` on `FamilienBenutzer`.`FamID`  = `FamilienTermine`.`FamID` LEFT JOIN `Icons` on `Termine`.`IconID` = `Icons`.`IconID` LEFT JOIN `Terminarten` on `Terminarten`.`TarID` = `Termine`.`TarID` where (`BenutzerTermine`.`BenID` = ? OR `FamilienTermine`.`FamID` = ?) GROUP BY IFNULL(`BenutzerTermine`.`BenID`, `FamilienBenutzer`.`BenID`), `Termine`.`TerID`, `Termine`.`Titel`, `Termine`.`Beschreibung`, `Termine`.`Start`, `Termine`.`Ende`, `Termine`.`Erinnerung`, `Terminarten`.`Wiederholung`, `Terminarten`.`WdhAlleXTage`, `Terminarten`.`WdhAlleXWochen`,`Terminarten`.`WdhAlleXMonate`, `Verantwortlichkeiten`.`Kuerzel`, `Icons`.`Pfad` ORDER BY `Termine`.`Start` ASC;';
      const ergebnis = await db.query(sql, [GetAllDatesForUserFamily.benid, GetAllDatesForUserFamily.famid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });

        if (ergebnis.length < 1) {
          let message = 'Date_not_found';
          return {message};
        } else {
          return {ergebnis};
        }
    }
  } else {
    let message = 'No_Parameters';
    return {message};
  }
}

module.exports = {
  GetAllDatesForUserFamily
}
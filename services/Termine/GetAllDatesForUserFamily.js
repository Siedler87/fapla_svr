const db = require('../db');

async function GetAllDatesForUserFamily(GetAllDatesForUserFamily){

  var sql = 'SELECT `BenutzerTermine`.`BenID`, `Termine`.`TerID`, `Termine`.`Titel`, `Termine`.`Beschreibung`, `Termine`.`Start`, `Termine`.`Ende`, `Termine`.`Erinnerung`, `Terminarten`.`Wiederholung`, `Terminarten`.`WdhAlleXTage`, `Terminarten`.`WdhAlleXWochen`,`Terminarten`.`WdhAlleXMonate`, `Verantwortlichkeiten`.`Kuerzel`, `Icons`.`Pfad` FROM `BenutzerTermine` LEFT JOIN `Verantwortlichkeiten` on `Verantwortlichkeiten`.`VerID` = `BenutzerTermine`.`VerID` LEFT JOIN `Termine` on `BenutzerTermine`.`TerID` = `Termine`.`TerID` LEFT JOIN `Icons` on `Termine`.`IconID` = `Icons`.`IconID` LEFT JOIN `Terminarten` on `Terminarten`.`TarID` = `Termine`.`TarID` where `BenutzerTermine`.`BenID` = ? ORDER BY `Termine`.`Start` ASC;';
  const ergebnis = await db.query(sql, [GetAllDatesForUserFamily.benid], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnis.length < 1) {
    let message = 'Account_not_found';
    return {message};
  } else {
      return {ergebnis};
  }
}

module.exports = {
  GetAllDatesForUserFamily
}
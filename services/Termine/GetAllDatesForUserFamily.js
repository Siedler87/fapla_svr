const db = require('../db');

async function GetAllDatesForUserFamily(GetAllDatesForUserFamily){
  if (GetAllDatesForUserFamily.benid != undefined && GetAllDatesForUserFamily.benid != null){
    var sql = 'SELECT `Benutzer`.`BenID` FROM `Benutzer`  where `Benutzer`.`BenID` = ?';
    const benergebnis = await db.query(sql, [GetAllDatesForUserFamily.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });

    if (benergebnis.length < 1) {
      let message = 'Acc_not_found';
      return {message};
    } else {

      var sql = 'SELECT `Benutzer`.`BenID` AS BenID, BenTermine.`TerID` AS TerID, BenTermine.`Titel` AS Titel, BenTermine.`Beschreibung` AS Beschreibung, BenTermine.`Start` AS Start, BenTermine.`Ende` AS Ende, BenTermine.`Erinnerung` AS Erinnerung,  BenTerminArten.`Wiederholung` AS Wiederholung, BenTerminArten.`WdhAlleXTage` AS WdhAlleXTage, BenTerminArten.`WdhAlleXWochen` AS WdhAlleXWochen, BenTerminArten.`WdhAlleXMonate` AS WdhAlleXMonate, `Verantwortlichkeiten`.`Kuerzel` as `Kuerzel`, BenIcons.`Pfad` AS Pfad FROM `Benutzer` LEFT JOIN `BenutzerTermine` ON `BenutzerTermine`.`BenID` = `Benutzer`.`BenID` LEFT JOIN `Verantwortlichkeiten` on `Verantwortlichkeiten`.`VerID` = `BenutzerTermine`.`VerID` LEFT JOIN `Termine` AS BenTermine ON `BenutzerTermine`.`TerID` = BenTermine.`TerID` LEFT JOIN `Icons` AS BenIcons on BenTermine.`IconID` = BenIcons.`IconID` LEFT JOIN `Terminarten` AS BenTerminArten on BenTerminArten.`TarID` = BenTermine.`TarID` where `Benutzer`.`BenID` = ? AND `BenutzerTermine`.`TerID` IS NOT NULL UNION DISTINCT SELECT AndereFamilienBenutzer.`BenID` AS BenID, FamTermine.`TerID` AS TerID, FamTermine.`Titel` AS Titel, FamTermine.`Beschreibung` AS Beschreibung, FamTermine.`Start` AS Start, FamTermine.`Ende` AS Ende, FamTermine.`Erinnerung` AS Erinnerung,  FamTerminArten.`Wiederholung` AS Wiederholung, FamTerminArten.`WdhAlleXTage` AS WdhAlleXTage,FamTerminArten.`WdhAlleXWochen` AS WdhAlleXWochen, FamTerminArten.`WdhAlleXMonate` AS WdhAlleXMonate, null as `Kuerzel`, FamIcons.`Pfad` AS Pfad FROM `Benutzer` LEFT JOIN `FamilienBenutzer` on `FamilienBenutzer`.`BenID`  = `Benutzer`.`BenID` LEFT JOIN `FamilienBenutzer` AS AndereFamilienBenutzer on `FamilienBenutzer`.`FamID`  = AndereFamilienBenutzer.`FamID` LEFT JOIN `FamilienTermine` on `FamilienTermine`.`FamID` = `FamilienBenutzer`.`FamID` LEFT JOIN `Termine` AS FamTermine ON `FamilienTermine`.`TerID` = FamTermine.`TerID` LEFT JOIN `Icons` AS FamIcons on FamTermine.`IconID` = FamIcons.`IconID` LEFT JOIN `Terminarten` AS FamTerminArten on FamTerminArten.`TarID` = FamTermine.`TarID` where `Benutzer`.`BenID` = ? AND FamTermine.`TerID` IS NOT NULL ORDER BY BenID, Start ASC;';
      const ergebnis = await db.query(sql, [GetAllDatesForUserFamily.benid], function (err, result) {
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
  } else if (GetAllDatesForUserFamily.famid != undefined && GetAllDatesForUserFamily.famid != null) { 
    var sql = 'SELECT `Familien`.`FamID` FROM `Familien` where `Familien`.`FamID` = ?';
    const famergebnis = await db.query(sql, [GetAllDatesForUserFamily.famid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (famergebnis.length < 1) {
      let message = 'Acc_not_found';
      return {message};
    } else {

      var sql = 'SELECT `FamilienBenutzer`.`BenID` AS BenID, FamTermine.`TerID` AS TerID, FamTermine.`Titel` AS Titel, FamTermine.`Beschreibung` AS Beschreibung, FamTermine.`Start` AS Start, FamTermine.`Ende` AS Ende, FamTermine.`Erinnerung` AS Erinnerung,  FamTerminArten.`Wiederholung` AS Wiederholung, FamTerminArten.`WdhAlleXTage` AS WdhAlleXTage,FamTerminArten.`WdhAlleXWochen` AS WdhAlleXWochen, FamTerminArten.`WdhAlleXMonate` AS WdhAlleXMonate, null as `Kuerzel`, FamIcons.`Pfad` AS Pfad FROM `FamilienBenutzer` LEFT JOIN `FamilienTermine` on `FamilienTermine`.`FamID` = `FamilienBenutzer`.`FamID` LEFT JOIN `Termine` AS FamTermine ON `FamilienTermine`.`TerID` = FamTermine.`TerID` LEFT JOIN `Icons` AS FamIcons on FamTermine.`IconID` = FamIcons.`IconID` LEFT JOIN `Terminarten` AS FamTerminArten on FamTerminArten.`TarID` = FamTermine.`TarID` where `FamilienBenutzer`.`FamID` = ? UNION DISTINCT SELECT `FamilienBenutzer`.`BenID`, BenTermine.`TerID` AS TerID, BenTermine.`Titel` AS Titel, BenTermine.`Beschreibung` AS Beschreibung, BenTermine.`Start` AS Start, BenTermine.`Ende` AS Ende, BenTermine.`Erinnerung` AS Erinnerung,  BenTerminArten.`Wiederholung` AS Wiederholung, BenTerminArten.`WdhAlleXTage` AS WdhAlleXTage, BenTerminArten.`WdhAlleXWochen` AS WdhAlleXWochen, BenTerminArten.`WdhAlleXMonate` AS WdhAlleXMonate, `Verantwortlichkeiten`.`Kuerzel`, BenIcons.`Pfad` AS Pfad FROM `FamilienBenutzer` LEFT JOIN `BenutzerTermine` ON `BenutzerTermine`.`BenID` = `FamilienBenutzer`.`BenID` LEFT JOIN `Termine` AS BenTermine ON `BenutzerTermine`.`TerID` = BenTermine.`TerID` LEFT JOIN `Verantwortlichkeiten` on `Verantwortlichkeiten`.`VerID` = `BenutzerTermine`.`VerID`  LEFT JOIN `Icons` AS BenIcons on BenTermine.`IconID` = BenIcons.`IconID` LEFT JOIN `Terminarten` AS BenTerminArten on BenTerminArten.`TarID` = BenTermine.`TarID` where `FamilienBenutzer`.`FamID` = ? AND `BenutzerTermine`.`TerID` IS NOT NULL ORDER BY BenID, Start ASC;';
      const ergebnis = await db.query(sql, [GetAllDatesForUserFamily.famid], function (err, result) {
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
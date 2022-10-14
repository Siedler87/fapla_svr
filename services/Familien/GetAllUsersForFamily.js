const db = require('../db');

async function GetAllUsersForFamily(GetAllUsersForFamily){

  var sql = 'SELECT `Benutzer`.`BenID`, `Benutzer`.`Accountname`, `Benutzer`.`Vorname`, `Benutzer`.`Nachname`, `Benutzer`.`Geburtsdatum`, `Benutzer`.`Email`, `Benutzer`.`LetzterLogin`, `Benutzer`.`Hintergrundfarbe`, `Bilder`.`Pfad`, `Familien`.`Familienname`, case when `Benutzer`.`Passwort` is not null then "H" else "N" end as `Accounttyp`,case when `FamilienAdmin`.`BenID` is not null then "Y" else "N" end as `Admin`, `Altersstufen`.`Von`, `Altersstufen`.`Bis`,`Altersstufen`.`Zeitfenster`,`Altersstufen`.`Darstellung` FROM `FamilienBenutzer` JOIN `Benutzer` on `FamilienBenutzer`.`BenID`=`Benutzer`.`BenID` JOIN `Familien` on `Familien`.`FamID`=`FamilienBenutzer`.`FamID` LEFT JOIN `FamilienAdmin` on (`FamilienBenutzer`.`FamID`,`FamilienBenutzer`.`BenID`)=(`FamilienAdmin`.`FamID`,`FamilienAdmin`.`BenID`) LEFT JOIN `BenutzerAltersstufen` on `BenutzerAltersstufen`.`BenID`=`Benutzer`.`BenID` LEFT JOIN `Altersstufen` on `BenutzerAltersstufen`.`AlsID`=`Altersstufen`.`AlsID` LEFT JOIN `Bilder` ON `Bilder`.`BildID` = `Benutzer`.`BildID` WHERE `FamilienBenutzer`.`FamID` = ?;';
  const ergebnis = await db.query(sql, [GetAllUsersForFamily.famid], function (err, result) {
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
  GetAllUsersForFamily
}
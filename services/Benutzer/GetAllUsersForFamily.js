const db = require('../db');

async function GetAllUsersForFamily(GetAllUsersForFamily){

  var sql = 'SELECT `Benutzer`.`BenID`, `Benutzer`.`Accountname`, `Benutzer`.`Vorname`, `Benutzer`.`Nachname`, `Benutzer`.`Geburtsdatum`, `Benutzer`.`Email`, `Benutzer`.`LetzterLogin`, `Benutzer`.`Hintergrundfarbe`, `Benutzer`.`BildID`, `Familien`.`Familienname`  FROM `Benutzer`,`FamilienBenutzer`,`Familien`  WHERE `FamilienBenutzer`.`BenID`=`Benutzer`.`BenID` AND `Familien`.`FamID`=`FamilienBenutzer`.`FamID` AND `FamilienBenutzer`.`FamID` = ?;';
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
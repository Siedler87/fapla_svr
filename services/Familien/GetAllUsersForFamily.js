const db = require('../db');

async function GetAllUsersForFamily(GetAllUsersForFamily){

  var sql = 'SELECT `Benutzer`.`BenID`, `Benutzer`.`Accountname`, `Benutzer`.`Vorname`, `Benutzer`.`Nachname`, `Benutzer`.`Geburtsdatum`, `Benutzer`.`Email`, `Benutzer`.`LetzterLogin`, `Benutzer`.`Hintergrundfarbe`, `Benutzer`.`BildID`, `Familien`.`Familienname`, case when `FamilienAdmin`.`BenID` > 0 then "H" else "N" end as `Accounttyp` FROM `FamilienBenutzer` JOIN `Benutzer` on `FamilienBenutzer`.`BenID`=`Benutzer`.`BenID` JOIN `Familien` on `Familien`.`FamID`=`FamilienBenutzer`.`FamID` LEFT JOIN `FamilienAdmin` on (`FamilienBenutzer`.`FamID`,`FamilienBenutzer`.`BenID`)=(`FamilienAdmin`.`FamID`,`FamilienAdmin`.`BenID`) WHERE `FamilienBenutzer`.`FamID` = ?;';
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
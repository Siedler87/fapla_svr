const db = require('../db');

async function UpdateUserAgeRestriction(UpdateUserAgeRestriction){

  if (UpdateUserAgeRestriction.benid != null && UpdateUserAgeRestriction.altersstufe != null) {
    var sql = 'UPDATE `BenutzerAltersstufen` SET `AlsID`= ? WHERE `BenID`= ? ';
    const ergebnis = await db.query(sql, [UpdateUserAgeRestriction.altersstufe, UpdateUserAgeRestriction.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'SELECT `Benutzer`.`BenID`, `Altersstufen`.`AlsID`, `Altersstufen`.`Von`, `Altersstufen`.`Bis`,`Altersstufen`.`Zeitfenster`,`Altersstufen`.`Darstellung` FROM `Benutzer` LEFT JOIN `BenutzerAltersstufen` on `BenutzerAltersstufen`.`BenID`=`Benutzer`.`BenID` LEFT JOIN `Altersstufen` on `BenutzerAltersstufen`.`AlsID`=`Altersstufen`.`AlsID` WHERE `Benutzer`.`BenID` = ?;';
      const subergebnis = await db.query(sql, [UpdateUserAgeRestriction.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Update_success';
      let benid = subergebnis[0].BenID;
      let alsid = subergebnis[0].AlsID;
      let von = subergebnis[0].Von;
      let bis = subergebnis[0].Bis;
      let zeitfenster = subergebnis[0].Zeitfenster;
      let darstellung = subergebnis[0].Darstellung;
      return {message, benid, alsid, von, bis, zeitfenster, darstellung};
    } else  {
      let message = 'Account_not_found';
      return {message};
    }
  } 


  // bei falschen Parameten
  if (UpdateUserAgeRestriction.benid == null  || UpdateUserAgeRestriction.altersstufe == null || UpdateUserAgeRestriction.benid == undefined  || UpdateUserAgeRestriction.altersstufe == undefined){
    let message = 'Keine_Parameter';
    return {message};
  }

  }

module.exports = {
  UpdateUserAgeRestriction
}
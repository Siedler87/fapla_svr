const db = require('../db');

async function UpdateUserPicture(UpdateUserPicture){

  if (UpdateUserPicture.benid != null && UpdateUserPicture.bildid != null && UpdateUserPicture.neuebildid != null) {
    if (UpdateUserPicture.bildid != UpdateUserPicture.neuebildid){ 
      var sql = 'UPDATE `Benutzer` SET `BildID` = ? where `BenID` = ?';
      const ergebnis = await db.query(sql, [UpdateUserPicture.neuebildid, UpdateUserPicture.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      if (ergebnis.affectedRows) {
      var sql = 'SELECT  `Benutzer`.`BenID`, `Bilder`.`Pfad` FROM `Benutzer` LEFT JOIN `Bilder` ON `Bilder`.`BildID` = `Benutzer`.`BildID` WHERE `BenID`= ?';
      const subergebnis = await db.query(sql, [UpdateUserPicture.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let benid = subergebnis[0].BenID;      
      let pfad = subergebnis[0].Pfad;
      return {benid, pfad};
      } else  {
        let message = 'Account_not_found';
        return {message};
      } 
    } else {
        let message = 'Same_ID_No_Change';
        return {message};  
    }
  }
  // bei falschen Parameten
  if ((UpdateUserPicture.benid == null ) || (UpdateUserPicture.bildid == null && UpdateUserPicture.neuebildid  == null)){
    let message = 'Keine_Parameter';
    return {message};
  }

  }

module.exports = {
  UpdateUserPicture
}
const db = require('../db');

async function UpdateUserPicture(UpdateUserPicture){

  if (UpdateUserPicture.benid != null && UpdateUserPicture.bildid != null && UpdateUserPicture.neuebildid != null) {
    if (UpdateUserPicture.bildid != UpdateUserPicture.neuebildid){ 
      var sql = 'UPDATE `Benutzer` SET `BildID` = ? where `BenID` = ?';
      const ergebnis = await db.query(sql, [UpdateUserPicture.bildid, UpdateUserPicture.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      if (ergebnis.affectedRows) {
      var sql = 'SELECT `BildID` FROM `Benutzer` WHERE `BenID`= ?';
      const subergebnis = await db.query(sql, [UpdateUserPicture.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let bildid = subergebnis[0].BildID;
      return {message, bildid};
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
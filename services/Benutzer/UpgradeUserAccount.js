const db = require('../db');

async function UpgradeUserAccount(UpgradeUserAccount){

  if (UpgradeUserAccount.benid != null && UpgradeUserAccount.email != null && UpgradeUserAccount.passwort != null) {
    var sql = 'UPDATE `Benutzer` SET `Email`= ?,`Passwort`= ? WHERE `BenID`= ?;';
    const ergebnis = await db.query(sql, [UpgradeUserAccount.email.trim(), UpgradeUserAccount.passwort.trim(), UpgradeUserAccount.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'UPDATE `BenutzerAltersstufen` SET `AlsID`= ? WHERE `BenID`= ? ';
      const ergebnis = await db.query(sql, ['3',UpgradeUserAccount.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
        };
      });
      var sql = 'SELECT `BenID`, `Email` FROM `Benutzer` WHERE `Benutzer`.`BenID` = ?;';
      const subergebnis = await db.query(sql, [UpgradeUserAccount.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Update_success';
      let benid = subergebnis[0].BenID;
      let email = subergebnis[0].Email;
      return {message, benid, email};
    } else  {
      let message = 'Account_not_found';
      return {message};
    }
  } 

  // bei falschen Parameten
  if (UpgradeUserAccount.benid == null || UpgradeUserAccount.benid == undefined || UpgradeUserAccount.passwort == null || UpgradeUserAccount.passwort == undefined|| UpgradeUserAccount.email == null || UpgradeUserAccount.email == undefined){
    let message = 'Keine_Parameter';
    return {message};
  }

  }

module.exports = {
  UpgradeUserAccount
}
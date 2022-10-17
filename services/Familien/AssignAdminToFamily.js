const db = require('../db');

async function AssignAdminToFamily(AssignAdminToFamily){

  if (AssignAdminToFamily.benid != undefined && AssignAdminToFamily.famid != undefined){
    var sql = 'SELECT FROM `FamilienBenutzer` WHERE `FamID` = ? AND `BenID` =  ?;';
    const ergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
        };
      });
    // Prüfe, ob Benutzer für die Familie eingetragen ist  
    if (ergebnis.length < 1) {
      let message = 'Account_not_found';
      return {message};
    } else {
      // Prüfe, ob Benutzer für die Familie bereits Admin ist
      var sql = 'SELECT FROM `FamilienAdmin` WHERE `FamID` = ? AND `BenID` =  ?;';
      const subergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
          };
      });
      // wenn nicht, dann lege ihn an  
      if (subergebnis.length < 1) {
        var sql = 'INSERT INTO `FamilienAdmin`(`FamID`, `BenID`) VALUES (?,?);'; 
        const assignergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.BenID], function (err, result) {
          if (err) {
            let message = 'Error';
            return {message};
          };
        });
        let message = 'Assigned';
        return {message};
      // ansonsten entferne ihn    
      } else {
        var sql = 'DELETE FROM `FamilienAdmin` WHERE `FamID` = ? AND `BenID` = ?;'; 
        const unassignergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.BenID], function (err, result) {
          if (err) {
            let message = 'Error';
            return {message};
          };
        });
        let message = 'Deleted';
        return {message};
      }  
    }
  } else {
    let message = 'Keine_Parameter';
    return {message};
  }
}  
module.exports = {
  AssignAdminToFamily
}
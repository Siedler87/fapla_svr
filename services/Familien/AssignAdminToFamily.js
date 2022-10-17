const db = require('../db');

async function AssignAdminToFamily(AssignAdminToFamily){

  if (AssignAdminToFamily.benid != undefined && AssignAdminToFamily.famid != undefined){
    var sql = 'SELECT 1 FROM `FamilienBenutzer` WHERE `FamID` = ? AND `BenID` =  ?;';
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
      var sql = 'SELECT * FROM `FamilienAdmin` WHERE `FamID` = ? AND `BenID` = ?;';
      const subergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
          };
      });
      // wenn nicht, dann lege ihn an  
      if (subergebnis.length < 1) {
        var sql = 'INSERT INTO `FamilienAdmin`(`FamID`, `BenID`) VALUES (?,?);'; 
        const assignergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
          if (err) {
            let message = 'Error';
            return {message};
          };
        });
        var sql = 'SELECT `FamilienBenutzer`.`BenID`, case when `FamilienAdmin`.`BenID` is not null then "Y" else "N" end as `Admin` FROM `FamilienBenutzer` LEFT JOIN `FamilienAdmin` on (`FamilienBenutzer`.`FamID`,`FamilienBenutzer`.`BenID`)=(`FamilienAdmin`.`FamID`,`FamilienAdmin`.`BenID`) WHERE `FamilienBenutzer`.`FamID` = ? AND `FamilienBenutzer`.`BenID` = ?;';
        const ergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
          if (err) {
            let message = 'Error';
            return {message};
          };
        });
        return {ergebnis};
      // ansonsten entferne ihn    
      } else {
        // prüfe zuvor, ob noch ein Admin verbleiben würde
        var sql = 'SELECT `BenID` FROM `FamilienAdmin` WHERE `FamID` = ?;';
        const adminergebnis = await db.query(sql, [AssignAdminToFamily.famid], function (err, result) {
          if (err) {
            let message = 'Error';
            return {message};
            };
        });
        if (adminergebnis.length > 1){
          var sql = 'DELETE FROM `FamilienAdmin` WHERE `FamID` = ? AND `BenID` = ?;'; 
          const unassignergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
            if (err) {
              let message = 'Error';
              return {message};
            };
          });
          var sql = 'SELECT `FamilienBenutzer`.`BenID`, case when `FamilienAdmin`.`BenID` is not null then "Y" else "N" end as `Admin` FROM `FamilienBenutzer` LEFT JOIN `FamilienAdmin` on (`FamilienBenutzer`.`FamID`,`FamilienBenutzer`.`BenID`)=(`FamilienAdmin`.`FamID`,`FamilienAdmin`.`BenID`) WHERE `FamilienBenutzer`.`FamID` = ? AND `FamilienBenutzer`.`BenID` = ?;';
          const ergebnis = await db.query(sql, [AssignAdminToFamily.famid, AssignAdminToFamily.benid], function (err, result) {
            if (err) {
              let message = 'Error';
              return {message};
            };
          });
          return {ergebnis};
        } else {
          let message = 'Cant_Delete_Last_Admin';
          return {message};
        }
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
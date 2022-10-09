const db = require('../db');

async function UpdateFamily(UpdateFamily){

  // Familienname aktualisieren
  if (UpdateFamily.famid != null && UpdateFamily.familienname != null) {
    var sql = 'UPDATE `Familien` SET `Familienname` = ? WHERE `famid`= ?';
    const ergebnis = await db.query(sql, [UpdateFamily.familienname.trim(), UpdateFamily.famid], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
    });
    if (ergebnis.affectedRows) {
      var sql = 'SELECT `FamID`, `Accountname`, `Familienname`, `BildID` FROM `Familien` WHERE `famid`= ?';
      const subergebnis = await db.query(sql, [UpdateFamily.famid], function (err, result) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Update_success';
      let famid = subergebnis[0].famid;
      let accountname = subergebnis[0].Accountname;
      let familienname = subergebnis[0].Familienname;
      let bildid = subergebnis[0].BildID;
      return {message, famid, accountname, familienname, bildid};
    } else  {
      let message = 'Account_not_found';
      return {message};
    }
  } 
  if (UpdateFamily.famid != null && UpdateFamily.passwort != null && UpdateFamily.neuespasswort != null){
      var sql = 'SELECT `Passwort` FROM `Familien` WHERE `famid` =  ?';
      const ergebnis = await db.query(sql, [UpdateFamily.famid], async function (err, result) {
        if (err) {
          console.log(err);
          let message = 'Error';
          return {message};
        };
      })
        if (ergebnis.length < 1)  {
          let message = 'Account_not_found';
          return {message};
        } else {
          if (ergebnis[0].Passwort == UpdateFamily.passwort.trim()){
              var sql = 'UPDATE `Familien` SET `Passwort`=? WHERE `famid`=?';
              const subergebnis = await db.query(sql, [UpdateFamily.neuespasswort.trim(), UpdateFamily.famid], function (err, result) {
                if (err) {
                  let message = 'Error';
                  return {message};
                };
              });
              if (subergebnis.affectedRows)  {
                let message = 'Update_success';
                return {message};
              }
              } else {
                let message = 'Password_wrong';
                return {message};
              }
          }  ;
  } 
  
  // bei falschen Parameten
  if ((UpdateFamily.famid == null) || (UpdateFamily.familienname == null && UpdateFamily.passwort == null && UpdateFamily.neuespasswort == null)){
    let message = 'Keine_Parameter';
    return {message};
  }

  }

module.exports = {
  UpdateFamily
}
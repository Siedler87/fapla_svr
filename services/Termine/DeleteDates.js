const db = require('../db');

async function DeleteFamily(DeleteFamily){

  if (DeleteFamily.famid != null && DeleteFamily.passwort != null){
    var sql = 'SELECT `Passwort` FROM `Familien` WHERE `FamID` =  ?';
    const ergebnis = await db.query(sql, [DeleteFamily.famid], async function (err, result) {
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
        if (ergebnis[0].Passwort == DeleteFamily.passwort.trim()){

            //ToDo: Prüfen, ob FamID woanders genutzt wird (Zuordungstabellen, dann dort zuerst löschen)
            var sql = 'DELETE FROM `FamilienBenutzer` WHERE `FamID`= ?';
            const fabergebnis = await db.query(sql, [DeleteFamily.famid], function (err, result) {
              if (err) {
                let message = 'Error';
                return {message};
              };
            });
            var sql = 'DELETE FROM `FamilienAdmin` WHERE `FamID`= ?';
            const faaergebnis = await db.query(sql, [DeleteFamily.famid], function (err, result) {
              if (err) {
                let message = 'Error';
                return {message};
              };
            });
            var sql = 'DELETE FROM `Familien` WHERE `FamID`= ?';
            const ergebnis = await db.query(sql, [DeleteFamily.famid], function (err, result) {
              if (err) {
                let message = 'Error';
                return {message};
              };
            });
            if (ergebnis.affectedRows) {
              var sql = 'SELECT 1 FROM `Familien` WHERE `FamID`= ?';
              const subergebnis = await db.query(sql, [DeleteFamily.famid], function (err, result) {
                if (err) {
                  let message = 'Error';
                  return {message};
                };
              });
              if (subergebnis.length < 1)  {
                let message = 'Delete_success';
                return {message};
              } else {
                let message = 'Delete_fail';
                return {message};
              }
            } else {
              let message = 'Account_not_found';
              return {message};
            }  
        } else {
          let message = 'Password_wrong';
          return {message};
        }

      }

  } 

}
module.exports = {
  DeleteFamily
}
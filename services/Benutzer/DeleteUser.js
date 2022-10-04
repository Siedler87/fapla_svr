const db = require('../db');

async function DeleteUser(DeleteUser){


  //ToDo: Prüfen, ob BenID woanders genutzt wird (Zuordungstabellen, dann dort zuerst löschen)
  var sql = 'DELETE FROM `Benutzer` WHERE `BenID`= ?';
  const ergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnis.affectedRows) {
    var sql = 'SELECT 1 FROM `Benutzer` WHERE `BenID`= ?';
    const subergebnis = await db.query(sql, [DeleteUser.benid], function (err, result) {
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
}

module.exports = {
  DeleteUser
}
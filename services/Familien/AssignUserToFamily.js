const db = require('../db');

async function AssignUserToFamily(AssignUserToFamily){

  var sql = 'SELECT `BenID` FROM `Benutzer` WHERE `Accountname` =  ?;';
  const ergebnisben = await db.query(sql, [AssignUserToFamily.accountname], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnisben.length < 1) {
    let message = 'Account_not_found';
    return {message};
  } else {
      var sql = 'INSERT INTO `FamilienBenutzer`(`FamID`, `BenID`) VALUES (?,?)';
      const subergebnis = await db.query(sql, [AssignUserToFamily.famid, ergebnisben[0].BenID], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };
        let message = 'Success';
        return {message};
      });
  }
}

module.exports = {
  AssignUserToFamily
}
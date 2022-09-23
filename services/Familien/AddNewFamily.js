const db = require('../db');

async function create(AddNewFamily){

  var sql = 'INSERT INTO Familien(`Accountname`,`Familienname`, `Passwort`) VALUES (?,?,?)';
  const result = await db.query(sql, [AddNewFamily.accountname.trim(), AddNewFamily.familienname.trim(), AddNewFamily.passwort.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  
  });
  if (result.affectedRows) {
    var sql = 'SELECT `FamID` FROM `Familien` WHERE `Accountname` = ?';
    const result = await db.query(sql, [AddNewFamily.accountname.trim()], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };

    });
    

      var sql = 'INSERT INTO FamilienAdmin(`FamID`, `BenID`) VALUES (?,?)';
      const subresult = await db.query(sql, [result[0].FamID, AddNewFamily.benid.trim()], function (err, subresult) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      let message = 'Success';
      return {message};

  }

}

module.exports = {
  create
}
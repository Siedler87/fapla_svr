const db = require('../db');

async function create(AddNewFamily){

  var sql = 'INSERT INTO Familien(`Accountname`,`Familienname`, `Passwort`, `BildID`) VALUES (?,?,?,?)';
  const result = await db.query(sql, [AddNewFamily.accountname.trim(), AddNewFamily.familienname.trim(), AddNewFamily.passwort.trim(),'1'], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  
  });
  if (result.affectedRows) {
    var sql = 'SELECT `FamID` FROM `Familien` WHERE `Accountname` = ?';
    const ergebnis = await db.query(sql, [AddNewFamily.accountname.trim()], function (err, result) {
      if (err) {
        let message = 'Error';
        return {message};
      };

    });
    

      var sql = 'INSERT INTO FamilienAdmin(`FamID`, `BenID`) VALUES (?,?)';
      const famadminresult = await db.query(sql, [ergebnis[0].FamID, AddNewFamily.benid], function (err, subresult) {
        if (err) {
          let message = 'Error';
          return {message};
        };
      });
      var sql = 'INSERT INTO FamilienBenutzer(`FamID`, `BenID`) VALUES (?,?)';
      const fambenresult = await db.query(sql, [ergebnis[0].FamID, AddNewFamily.benid], function (err, subresult) {
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
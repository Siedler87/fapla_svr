const db = require('../db');

async function create(AddNewFamily){

  // current date
  
  var sql = 'INSERT INTO Familien(`Accountname`,`Familienname`, `Passwort`) VALUES (?,?)';
  const result = await db.query(sql, [AddNewFamily.accountname.trim(), AddNewFamily.familienname.trim(), AddNewFamily.passwort.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  
  });
  if (result.affectedRows) {
    message = 'Success';
  }
  return {message};

}

module.exports = {
  create
}
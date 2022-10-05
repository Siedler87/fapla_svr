const db = require('../db');

async function GetAllFamiliesForUser(GetAllFamiliesForUser){

  var sql = 'SELECT `Accountname`, `Familienname`, `BildID` FROM FamilienBenutzer,Familien WHERE FamilienBenutzer.FamID = Familien.FamID and FamilienBenutzer.BenID = ?;';
  const ergebnis = await db.query(sql, [GetAllFamiliesForUser.benid], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  });
  if (ergebnis.length < 1) {
    let message = 'Account_not_found';
    return {message};
  } else {
      let message = 'Success';
      let accountname = ergebnis[0].accountname;
      let familienname = ergebnis[0].familienname;
      let bildid = ergebnis[0].bildid;
      return {message, accountname, familienname, bildid};
  }
}

module.exports = {
  GetAllFamiliesForUser
}
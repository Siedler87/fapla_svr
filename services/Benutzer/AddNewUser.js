const db = require('../db');

async function create(AddNewUser){

  // current date
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var CurrentTimestamp = "'"+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+"'";

  console.log(CurrentTimestamp);

  var sql = 'INSERT INTO Benutzer (`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `LetzterLogin`, `Hintergrundfarbe`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
  const result = await db.query(sql, [AddNewUser.accountname.trim(), AddNewUser.vorname.trim(), AddNewUser.nachname.trim(), AddNewUser.geburtsdatum.trim(), AddNewUser.email.trim(), AddNewUser.passwort.trim(), CurrentTimestamp, AddNewUser.hintergrundfarbe.trim()], function (err, result) {
    if (err) {
      let message = 'Error';
      return {message};
    };
  
  });
  if (result.affectedRows) {
    console.log(result);
    message = 'Success';
  }
  return {message};

}

module.exports = {
  create
}
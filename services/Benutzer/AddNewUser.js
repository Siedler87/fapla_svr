const db = require('../db');
const helper = require('../../helper');
const config = require('../../config');

// current date
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var CurrentTimestamp = "'"+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+"'";

async function create(AddNewUser){

  var sql = 'INSERT INTO Benutzer (`Accountname`, `Vorname`, `Nachname`, `Geburtsdatum`, `Email`, `Passwort`, `LetzterLogin`, `Hintergrundfarbe`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
  const result = await db.query(sql, [AddNewUser.Accountname, AddNewUser.Vorname, AddNewUser.Nachname, AddNewUser.Geburtsdatum, AddNewUser.Email, AddNewUser.Passwort, CurrentTimestamp, AddNewUser.Hintergrundfarbe], function (err, result) {
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
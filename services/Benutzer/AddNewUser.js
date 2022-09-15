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
var CURRENT_TIMESTAMP = "'"+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+"'";

async function create(AddNewUser){

  const result = await db.query(
    `INSERT INTO Benutzer (Accountname, Vorname, Nachname, Geburtsdatum, Email, Passwort, LetzterLogin, Hintergrundfarbe)
    VALUES (
      ${AddNewUser.accountname},${AddNewUser.vorname},${AddNewUser.nachname},${AddNewUser.geburtsdatum},${AddNewUser.email},
      ${AddNewUser.passwort}, ${CURRENT_TIMESTAMP}, ${AddNewUser.hintergrundfarbe})`
  );

  let message = 'Error in creating user entry';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

module.exports = {
  create
}
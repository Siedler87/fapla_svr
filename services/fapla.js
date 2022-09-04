const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT vorname, familienname  
    FROM user WHERE accountname = "admin"
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(user){
  const result = await db.query(
    `INSERT INTO user 
    (accountname, vorname, familienname, 
     mail, gebdatum, letzterlogin, 
     registrierungsdatum, passwort, usertype) 
    VALUES (
      ${fapla.user_accountname}, ${fapla.user_vorname}, ${fapla.user_familienname}, 
      ${fapla.user_mail}, ${fapla.user_gebdatum}, ${fapla.user_gebdatum},
      ${fapla.user_registrierungsdatum}, ${fapla.user_passwort}, ${fapla.user_usertype})`
  );

  let message = 'Error in creating user entry';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
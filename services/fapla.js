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

async function create(fapla){
  const result = await db.query(
    `INSERT INTO user 
    (accountname, vorname, familienname, 
     mail, gebdatum, letzterlogin, 
     registrierungsdatum, passwort, usertype) 
    VALUES (
      ${fapla.accountname}, ${fapla.vorname}, ${fapla.familienname}, 
      ${fapla.mail}, ${fapla.gebdatum}, ${fapla.gebdatum},
      ${fapla.registrierungsdatum}, ${fapla.passwort}, ${fapla.usertype}
      )`
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
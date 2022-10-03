const express = require('express');
const router = express.Router();
const AddNewUser = require('../../services/Benutzer/AddNewUser');
const GetUserAccountnames = require('../../services/Benutzer/GetUserAccountnames');
const GetLoginUser = require('../../services/Benutzer/GetLoginUser');

/* AddNewUser - neuen Hauptnutzer eintragen */
router.post('/AddNewUser', async function(req, res, next) {
  try {
    res.json(await AddNewUser.AddNewUser(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewUser`, err.message);
    next(err);
  }
});

/* GetUserAccountnames - alle vorhandenen Accountnames von Benutzer abfragen */
router.get('/GetUserAccountnames', async function(req, res, next) {
  try {
    res.json(await GetUserAccountnames.GetUserAccountnames());
  } catch (err) {
    console.error(`Error while fetching GetUserAccountnames`, err.message);
    next(err);
  }
});

/* GetLoginUser - Passwort abfragen für Benutzer-Login */
router.post('/GetLoginUser', async function(req, res, next) {
  try {
    res.json(await GetLoginUser.GetLoginUser(req.body));
  } catch (err) {
    console.error(`Error while fetching GetLoginUser`, err.message);
    next(err);
  }
});

/* UpdateUser - Hauptnutzer aktualisieren */
router.post('/UpdateUser', async function(req, res, next) {
  try {
    res.json(await UpdateUser.UpdateUser(req.body));
  } catch (err) {
    console.error(`Error while creating UpdateUser`, err.message);
    next(err);
  }
});

module.exports = router;


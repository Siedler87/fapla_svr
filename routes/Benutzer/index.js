const express = require('express');
const router = express.Router();
const AddNewUser = require('../../services/Benutzer/AddNewUser');
const GetUserAccountnames = require('../../services/Benutzer/GetUserAccountnames');

/* AddNewUser - neuen Hauptnutzer eintragen */
router.post('/AddNewUser', async function(req, res, next) {
  try {
    res.json(await AddNewUser.create(req.body));
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

module.exports = router;


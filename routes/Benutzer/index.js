const express = require('express');
const router = express.Router();
const AddNewUser = require('../../services/Benutzer/AddNewUser');
const AddNewFamily = require('../../services/Benutzer/AddNewFamily');


/* AddNewUser - neuen Hauptnutzer eintragen */
router.post('/AddNewUser', async function(req, res, next) {
  try {
    res.json(await AddNewUser.create(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewUser`, err.message);
    next(err);
  }
});

/* AddNewFamily - neue Familie eintragen */
router.post('/AddNewFamily', async function(req, res, next) {
  try {
    res.json(await AddNewFamily.create(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewFamily`, err.message);
    next(err);
  }
});

module.exports = router;


const express = require('express');
const router = express.Router();
const AddNewUser = require('../services/AddNewUser');


/* AddNewUser - neuen Hauptnutzer eintragen */
router.post('/', async function(req, res, next) {
  try {
    res.json(await AddNewUser.create(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewUser`, err.message);
    next(err);
  }
});

module.exports = router;
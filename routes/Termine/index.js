const express = require('express');
const router = express.Router();
const AddNewDates = require('../../services/Termine/AddNewDates');
const GetAllDatesForUserFamily = require('../../services/Termine/GetAllDatesForUserFamily');


/*
 AddNewDates - neuen Termin eintragen 
router.post('/AddNewDates', async function(req, res, next) {
  try {
    res.json(await AddNewDates.create(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewDates`, err.message);
    next(err);
  }
});
*/

/* GetAllDatesForUserFamily - alle vorhandenen Termine vom Benutzer oder dessen Familie abfragen */
router.get('/GetAllDatesForUserFamily', async function(req, res, next) {
  try {
    res.json(await GetAllDatesForUserFamily.GetAllDatesForUserFamily());
  } catch (err) {
    console.error(`Error while fetching GetAllDatesForUserFamily`, err.message);
    next(err);
  }
});

// UpdateDates (Zeit ändern, Beschreibung, Icon wechseln)
// AssignDatesToUserFamily (Nutzer oder Familien hinzufügen)
// UnassignDatesFromUserFamily (Nutzer oder Familie entfernen - immer ein Nutzer verbleibend)
// DeleteDates 

module.exports = router;


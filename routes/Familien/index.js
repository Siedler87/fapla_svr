const express = require('express');
const router = express.Router();
const AddNewFamily = require('../../services/Familien/AddNewFamily');
const GetFamilyAccountnames = require('../../services/Familien/GetFamilyAccountnames');
const GetLoginFamily = require('../../services/Familien/GetLoginFamily');

/* AddNewFamily - neue Familie eintragen */
router.post('/AddNewFamily', async function(req, res, next) {
  try {
    res.json(await AddNewFamily.create(req.body));
  } catch (err) {
    console.error(`Error while creating AddNewFamily`, err.message);
    next(err);
  }
});

/* GetFamilyAccountnames - alle vorhandenen Accountnames von Familien abfragen */
router.get('/GetFamilyAccountnames', async function(req, res, next) {
  try {
    res.json(await GetFamilyAccountnames.GetFamilyAccountnames());
  } catch (err) {
    console.error(`Error while fetching GetFamilyAccountnames`, err.message);
    next(err);
  }
});

/* GetLoginFamily - Passwort abfragen für Family-Login */
router.post('/GetLoginFamily', async function(req, res, next) {
  try {
    res.json(await GetLoginFamily.GetLoginFamily(req.body));
  } catch (err) {
    console.error(`Error while fetching GetLoginFamily`, err.message);
    next(err);
  }
});

module.exports = router;


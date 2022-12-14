const express = require('express');
const router = express.Router();
const AddNewFamily = require('../../services/Familien/AddNewFamily');
const GetFamilyAccountnames = require('../../services/Familien/GetFamilyAccountnames');
const GetLoginFamily = require('../../services/Familien/GetLoginFamily');
const GetAllFamiliesForUser = require('../../services/Familien/GetAllFamiliesForUser');
const AssignUserToFamily = require('../../services/Familien/AssignUserToFamily');
const GetAllUsersForFamily = require('../../services/Familien/GetAllUsersForFamily');
const DeleteFamily = require('../../services/Familien/DeleteFamily');
const UpdateFamily = require('../../services/Familien/UpdateFamily');
const AssignAdminToFamily = require('../../services/Familien/AssignAdminToFamily');


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

/* GetAllFamiliesForUser - Passwort abfragen für Family-Login */
router.post('/GetAllFamiliesForUser', async function(req, res, next) {
  try {
    res.json(await GetAllFamiliesForUser.GetAllFamiliesForUser(req.body));
  } catch (err) {
    console.error(`Error while fetching GetAllFamiliesForUser`, err.message);
    next(err);
  }
});

/* AssignUserToFamily - User zur Familie hinzufügen */
router.post('/AssignUserToFamily', async function(req, res, next) {
  try {
    res.json(await AssignUserToFamily.AssignUserToFamily(req.body));
  } catch (err) {
    console.error(`Error while fetching AssignUserToFamily`, err.message);
    next(err);
  }
});

/* GetAllUsersForFamily - alle vorhanden Benutzer zu einer Familie anzeigen */
router.post('/GetAllUsersForFamily', async function(req, res, next) {
  try {
    res.json(await GetAllUsersForFamily.GetAllUsersForFamily(req.body));
  } catch (err) {
    console.error(`Error while creating GetAllUsersForFamily`, err.message);
    next(err);
  }
});

/* DeleteFamily - Familie löschen */
router.post('/DeleteFamily', async function(req, res, next) {
  try {
    res.json(await DeleteFamily.DeleteFamily(req.body));
  } catch (err) {
    console.error(`Error while creating DeleteFamily`, err.message);
    next(err);
  }
});

/* UpdateFamily - Familie aktualisieren */
router.post('/UpdateFamily', async function(req, res, next) {
  try {
    res.json(await UpdateFamily.UpdateFamily(req.body));
  } catch (err) {
    console.error(`Error while creating UpdateFamily`, err.message);
    next(err);
  }
});

/* AssignAdminToFamily - Familienadmin aktualisieren */
router.post('/AssignAdminToFamily', async function(req, res, next) {
  try {
    res.json(await AssignAdminToFamily.AssignAdminToFamily(req.body));
  } catch (err) {
    console.error(`Error while creating AssignAdminToFamily`, err.message);
    next(err);
  }
});

module.exports = router;


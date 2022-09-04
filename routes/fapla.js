const express = require('express');
const router = express.Router();
const fapla = require('../services/fapla');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await fapla.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting fapla user `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await fapla.create(req.body));
  } catch (err) {
    console.error(`Error while creating fapla user`, err.message);
    next(err);
  }
});

module.exports = router;
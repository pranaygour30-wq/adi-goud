const express = require('express');
const router = express.Router();
const TrustOb = require('../models/TrustOb');

// GET all trustob
router.get('/', async (req, res) => {
  const trustob = await TrustOb.find();
  res.json(trustob);
});

module.exports = router;

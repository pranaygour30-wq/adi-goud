const express = require('express');
const router = express.Router();
const OfficeBearer = require('../models/OfficeBearer');

// GET all officebearers
router.get('/', async (req, res) => {
  const officebearers = await OfficeBearer.find();
  res.json(officebearers);
});

module.exports = router;

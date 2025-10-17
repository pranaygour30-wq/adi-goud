const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET all gallery
router.get('/', async (req, res) => {
  const gallery = await Gallery.find();
  res.json(gallery);
});

module.exports = router;

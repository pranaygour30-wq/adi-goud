const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  date: Date,
  category: String
});

module.exports = mongoose.model('Gallery', gallerySchema);

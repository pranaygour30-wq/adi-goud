const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  venue: String,
  date: Date,
  type: String,
  image: String
});

module.exports = mongoose.model('Event', eventSchema);

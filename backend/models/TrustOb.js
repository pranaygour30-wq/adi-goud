const mongoose = require('mongoose');

const trustObSchema = new mongoose.Schema({
  's.no': Number,
  name: String,
  desgination: String,
  phone: Number,
  photo: String,
  email: String
});

module.exports = mongoose.model('TrustOb', trustObSchema);

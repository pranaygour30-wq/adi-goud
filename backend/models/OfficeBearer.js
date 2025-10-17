const mongoose = require('mongoose');

const officeBearerSchema = new mongoose.Schema({
  's.no': Number,
  name: String,
  designation: String,
  phone: Number,
  photo: String,
  email: String
});

module.exports = mongoose.model('OfficeBearer', officeBearerSchema);

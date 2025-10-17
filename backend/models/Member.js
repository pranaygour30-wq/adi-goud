const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  Name: String,
  Father: String,
  "Date of birth": String,
  "Anniversary date": String,
  "Blood Group": String,
  Occupation: String,
  Phone: Number,
  Email: String,
  photo: String
}, { collection: 'members' }); // explicitly use your collection name

module.exports = mongoose.model('Member', memberSchema);

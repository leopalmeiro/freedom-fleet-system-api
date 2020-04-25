const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  id: String,
  name: String,
  birthdate: Date,
  image: String,
  pass: String,
  email: String,
  dt_created: {type: Date, default: Date.now()},
  dt_updated: Date,
});

module.exports = mongoose.model('Driver', DriverSchema);
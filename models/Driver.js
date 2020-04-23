const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  id: String,
  name: String,
  birthdate: Date,
  image: String,
  pass: String,
  email: String,
  dt_create: {type: Date, default: Date.now()},
  dt_update: Date,
});

module.exports = mongoose.model('Driver', DriverSchema);
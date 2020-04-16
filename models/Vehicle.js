var mongoose = require('mongoose');

var VehicleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  model: String,
  year: Number,
  plate: String,
  qrdata: String,
  dt_created: { type: Date, default: Date.now },
  dt_updated: Date,
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

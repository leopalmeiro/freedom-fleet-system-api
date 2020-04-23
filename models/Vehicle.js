var mongoose = require('mongoose');

var VehicleSchema = new mongoose.Schema({
  id: String,
  type: String,
  model: String,
  year: Number,
  plate: String,
  qrdata: String,
  dt_created: { type: Date, default: Date.now },
  dt_updated: Date,
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

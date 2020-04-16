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
/* 
VehicleSchema.pre('save', function(next) {
  //console.log(`pre ${this.id}`);
  this.qrdata = this.id;
  next();
});
VehicleSchema.post('save', function(doc,next) {
  console.log(`pos ${doc}`);
  this.qrdata = doc.id;
  next();
}); */

module.exports = mongoose.model('Vehicle', VehicleSchema);

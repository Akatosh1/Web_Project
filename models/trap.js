var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TrapSchema = new Schema(
  {
  	address :{type: String, required: true},
  	text :{type: String, required: true}
  }
);


module.exports = mongoose.model('Trap', TrapSchema);
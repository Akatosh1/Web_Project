const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
  {
  	persons :{type: String, required: true},
    status: {type: String, required: true, enum: ['Available','Reserved'], default: 'Available'},
    owner :{type: String, required: true, default: 'undefined'},
    time :{type: String, required: true, default: 'undefined'},
    number :{type: String, required: true, default: 'undefined'}
  }
);

TableSchema
.virtual('url')
.get(function () {
  return '/catalog/table/' + this._id;
});

TableSchema
.virtual('reservation_url')
.get(function () {
  return '/catalog/table/' + this._id;
});

module.exports = mongoose.model('Table', TableSchema);
const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
  {
  	persons :{type: String, required: true},
    status: {type: String, required: true, enum: ['Available','Reserved'], default: 'Available'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
TableSchema
.virtual('url')
.get(function () {
  return '/catalog/table/' + this._id;
});

TableSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('Table', TableSchema);
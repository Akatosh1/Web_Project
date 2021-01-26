const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DrinkSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    price: {type: String, required: true, maxlength: 100},
    calories: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 100},
    picture:{type: String, required: true}
  }
);

DrinkSchema
.virtual('url')
.get(function () {
  return '/catalog/drink/' + this._id;
});

module.exports = mongoose.model('Drink', DrinkSchema);
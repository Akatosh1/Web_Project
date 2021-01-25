const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DrinkSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    price: {type: String, required: true, maxlength: 100},
    calories: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 100},
  }
);


// Virtual for author's URL
DrinkSchema
.virtual('url')
.get(function () {
  return '/catalog/drink/' + this._id;
});

/*DrinkSchema
.virtual('lifespan_formatted')
.get(function () {
  return this.calories ? DateTime.fromJSDate(this.calories).toLocaleString(DateTime.DATE_MED) : '';
});*/

//Export model
module.exports = mongoose.model('Drink', DrinkSchema);
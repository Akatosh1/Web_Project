var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema(
  {
    name: {type: String, required: true},
    price: {type: String, required: true, maxlength: 100},
    calories: {type: String, required: true, maxlength: 100},
    ingredients: {type: String, required: true, maxlength: 100},
    recommend_drink: {type: String, required: true, maxlength: 100},
    summary: {type: String, required: true}
  }
);

// Virtual for book's URL
FoodSchema
.virtual('url')
.get(function () {
  return '/catalog/food/' + this._id;
});

//Export model
module.exports = mongoose.model('Food', FoodSchema);
var Drink = require('../models/drink');
var async = require('async');
var Food = require('../models/food');

// Display list of all Drinks.
exports.drink_list = function(req, res, next) {

  Drink.find()
    .sort([['name']])
    .exec(function (err, list_drink) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('drink_list', { title: 'Drink List', drink_list: list_drink });
    });

};

// Display detail page for a specific Drink.
exports.drink_detail = function(req, res, next) {

    async.parallel({
        drink: function(callback) {
            Drink.findById(req.params.id)
              .exec(callback)
        },
        drinks_books: function(callback) {
          Food.find({ 'drink': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.drink==null) { // No results.
            var err = new Error('Drink not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('drink_detail', { title: 'Drink Detail', drink: results.drink, drink_books: results.drinks_books } );
    });

};

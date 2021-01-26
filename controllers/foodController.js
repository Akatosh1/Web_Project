var Food = require('../models/food');
var Drink = require('../models/drink');
var Table = require('../models/table');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        food_count: function(callback) {
            Food.countDocuments({}, callback);
        },
        table_count: function(callback) {
            Table.countDocuments({}, callback);
        },
        table_available_count: function(callback) {
            Table.countDocuments({status:'Available'}, callback);
        },
        drink_count: function(callback) {
            Drink.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Домик в Деревне', error: err, data: results });
    });
};

exports.food_list = function(req, res, next) {

  Food.find()
    .exec(function (err, list_food) {
      if (err) { return next(err); }
      res.render('food_list', { title: 'Food List', food_list: list_food });
    });

};

exports.food_detail = function(req, res, next) {

    async.parallel({
        food: function(callback) {

            Food.findById(req.params.id)
              .populate('drink')
              .exec(callback);
        },
        food_instance: function(callback) {

          Table.find({ 'food': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.food==null) { 
            var err = new Error('Food not found');
            err.status = 404;
            return next(err);
        }
        res.render('food_detail', { title: results.food.title, food: results.food, food_instances: results.food_instance } );
    });

};

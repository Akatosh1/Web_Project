var Food = require('../models/food');
var Drink = require('../models/drink');
var Table = require('../models/table');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        food_count: function(callback) {
            Food.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
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
      //Successful, so render
      res.render('food_list', { title: 'Food List', food_list: list_food });
    });

};

// Display detail page for a specific food.
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
        if (results.food==null) { // No results.
            var err = new Error('Food not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('food_detail', { title: results.food.title, food: results.food, food_instances: results.food_instance } );
    });

};

// Display food create form on GET.
exports.food_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Food create GET');
};

// Handle food create on POST.
exports.food_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Food create POST');
};

// Display food delete form on GET.
exports.food_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Food delete GET');
};

// Handle food delete on POST.
exports.food_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Food delete POST');
};

// Display food update form on GET.
exports.food_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Food update GET');
};

// Handle food update on POST.
exports.food_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Food update POST');
};
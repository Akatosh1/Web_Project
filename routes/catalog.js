var express = require('express');
var router = express.Router();

// Require controller modules.
var food_controller = require('../controllers/foodController');
var drink_controller = require('../controllers/drinkController');
var table_controller = require('../controllers/tableController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', food_controller.index);

// GET request for one Book.
router.get('/food/:id', food_controller.food_detail);

// GET request for list of all Book items.
router.get('/foods', food_controller.food_list);

// GET request for one Author.
router.get('/drink/:id', drink_controller.drink_detail);

// GET request for list of all Authors.
router.get('/drinks', drink_controller.drink_list);

// GET request for one BookInstance.
router.get('/table/:id', table_controller.table_detail);

router.post('/table/:id', table_controller.table_detail_post);

// GET request for list of all BookInstance.
router.get('/tables', table_controller.table_list);

module.exports = router;
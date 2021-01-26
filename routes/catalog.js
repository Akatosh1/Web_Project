var express = require('express');
var router = express.Router();


var food_controller = require('../controllers/foodController');
var drink_controller = require('../controllers/drinkController');
var table_controller = require('../controllers/tableController');

router.get('/', food_controller.index);

router.get('/food/:id', food_controller.food_detail);

router.get('/foods', food_controller.food_list);

router.get('/drink/:id', drink_controller.drink_detail);

router.get('/drinks', drink_controller.drink_list);

router.get('/table/:id', table_controller.table_detail);

router.post('/table/:id', table_controller.table_detail_post);

router.get('/tables', table_controller.table_list);

module.exports = router;
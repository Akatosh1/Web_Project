var express = require('express');
var router = express.Router();

// Require controller modules.
var food_controller = require('../controllers/foodController');
var drink_controller = require('../controllers/drinkController');
var table_controller = require('../controllers/tableController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', food_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/food/create', food_controller.food_create_get);

// POST request for creating Book.
router.post('/food/create', food_controller.food_create_post);

// GET request to delete Book.
router.get('/food/:id/delete', food_controller.food_delete_get);

// POST request to delete Book.
router.post('/food/:id/delete', food_controller.food_delete_post);

// GET request to update Book.
router.get('/food/:id/update', food_controller.food_update_get);

// POST request to update Book.
router.post('/food/:id/update', food_controller.food_update_post);

// GET request for one Book.
router.get('/food/:id', food_controller.food_detail);

// GET request for list of all Book items.
router.get('/foods', food_controller.food_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display drink).
router.get('/drink/create', drink_controller.drink_create_get);

// POST request for creating Author.
router.post('/drink/create', drink_controller.drink_create_post);

// GET request to delete Author.
router.get('/drink/:id/delete', drink_controller.drink_delete_get);

// POST request to delete Author.
router.post('/drink/:id/delete', drink_controller.drink_delete_post);

// GET request to update Author.
router.get('/drink/:id/update', drink_controller.drink_update_get);

// POST request to update Author.
router.post('/drink/:id/update', drink_controller.drink_update_post);

// GET request for one Author.
router.get('/drink/:id', drink_controller.drink_detail);

// GET request for list of all Authors.
router.get('/drinks', drink_controller.drink_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/table/create', table_controller.table_create_get);

// POST request for creating BookInstance.
router.post('/table/create', table_controller.table_create_post);

// GET request to delete BookInstance.
router.get('/table/:id/delete', table_controller.table_delete_get);

// POST request to delete BookInstance.
router.post('/table/:id/delete', table_controller.table_delete_post);

// GET request to update BookInstance.
router.get('/table/:id/update', table_controller.table_update_get);

// POST request to update BookInstance.
router.post('/table/:id/update', table_controller.table_update_post);

// GET request for one BookInstance.
router.get('/table/:id', table_controller.table_detail);

// GET request for list of all BookInstance.
router.get('/tables', table_controller.table_list);

module.exports = router;
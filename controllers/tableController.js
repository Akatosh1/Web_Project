var Table = require('../models/table');
const { body,validationResult } = require("express-validator");

// Display list of all Tables.
exports.table_list = function(req, res, next) {

  Table.find()
    .sort([['persons']])
    .exec(function (err, list_tables) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('table_list', { title: 'Table List', table_list: list_tables });
    });

};

// Display detail page for a specific Table.
exports.table_detail = function(req, res, next) {

    Table.findById(req.params.id)
    .exec(function (err, table) {
      if (err) { return next(err); }
      if (table==null) {
          var err = new Error('Table not found');
          err.status = 404;
          return next(err);
        }
      res.render('table_detail', { title: 'Бронирование: Столик на '+table.persons, table:  table});
    })
};

// Display Table create form on GET.
exports.table_detail_post  = [

    body('persons', 'Неправильное подтверждение кол-ва персон.').trim().isLength({ min: 8, max : 9 }).escape(),
	body('owner', 'Вы должны указать свое имя.').trim().isLength({ min: 3 }).escape(),
    body('time', 'Неправильно указано время бронирования.').trim().isLength({ min: 1, max : 2 }).matches(/\d/).escape(),
    body('number', 'Неправильно указан контактный номер.').trim().isLength({ min: 11, max: 11 }).matches(/\d/).escape(),
    
    (req, res, next) => {
    	const errors = validationResult(req);

    	var table = new Table(
    	{
          persons: req.body.persons,
          status: 'Reserved',
          owner: req.body.owner,
          time: req.body.time,
          number : req.body.number,
          _id:req.params.id
    	})


    	if (!errors.isEmpty()) {
            (

              Table.findById(req.params.id)
              .exec(function (err, table) {
                if (err) { return next(err); }
                  if (table==null) {
                    var err = new Error('Table not found');
                    err.status = 404;
                    return next(err);
                }
              res.render('table_detail', { title: 'Бронирование: Столик на '+table.persons, table:  table, errors: errors.array()});})   
            );
            return;
        }
        else {
        	Table.findByIdAndUpdate(req.params.id, table, {}, function (err,thebook) {
                if (err) { return next(err); }
                   res.redirect(/catalog/);
                });
        }
    }

];


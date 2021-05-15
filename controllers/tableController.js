var Table = require('../models/table');
var Trap = require('../models/trap');
var Food = require('../models/food');
var Drink = require('../models/drink');

const { body,validationResult } = require("express-validator");

exports.table_list = function(req, res, next) {

  Table.find()
    .sort([['persons']])
    .exec(function (err, list_tables) {
      if (err) { return next(err); }
      res.render('table_list', { title: 'Table List', table_list: list_tables });
    });

};

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

exports.trap = function(req, res, next) {

  Table.find()
    .sort([['persons']])
    .exec(function (err, list_tables) {
      if (err) { return next(err); }
      res.render('trap', { title: 'Table List', table_list: list_tables, cont: "" });
    });

};

exports.trap_post = [
    body('text', 'Неправильный запрос').trim().isLength({ min: 3 }).escape(),
    (req, res, next) => {
      const errors = validationResult(req);

      if(req.ip){
        trapdetail = {address:req.ip, text: req.body.text}
        var trap = new Trap(trapdetail)
        var conte = ""
        if(req.body.text == "tables"){
          Table.find()
          .exec(function (err, list_tables) {
              if (err) { return next(err); }
              res.render('trap', { title: 'Table List', table_list: list_tables, cont: list_tables});
            }); 
        }
        if(req.body.text == "food"){
          Food.find()
          .exec(function (err, list_tables) {
              if (err) { return next(err); }
              res.render('trap', { title: 'Table List', table_list: list_tables, cont: list_tables});
            }); 
        }
        if(req.body.text == "drink"){
          Drink.find()
          .exec(function (err, list_tables) {
              if (err) { return next(err); }
              res.render('trap', { title: 'Table List', table_list: list_tables, cont: list_tables});
            }); 
        }
        else{conte = "неправильный запрос"}
        trap.save(function(err){
          if(err){return next(err);}
          Table.find()
            .sort([['persons']])
            .exec(function (err, list_tables) {
              if (err) { return next(err); }
              res.render('trap', { title: 'Table List', table_list: list_tables, cont: conte});
            });
        });
      }
      else{
        var err = new Error("Потерян адрес")
        err.status = 404
        return next(err)
      }
    }
];


exports.table_detail_post  = [

    body('persons', 'Неправильное подтверждение кол-ва персон.').trim().isLength({ min: 8, max : 9 }).escape(),
	body('owner', 'Вы должны указать свое имя.').trim().isLength({ min: 3 }).escape(),
    body('time', 'Неправильно указано время бронирования.').trim().isLength({ min: 1, max : 2 }).matches(/\d/).escape(),
    body('number', 'Неправильно указан контактный номер.').trim().isLength({ min: 8, max: 12 }).matches(/\d/).escape(),
    
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



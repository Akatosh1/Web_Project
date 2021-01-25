var Table = require('../models/table');

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
      if (table==null) { // No results.
          var err = new Error('Table not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('table_detail', { title: 'Table: '+table.persons, table:  table});
    })

};

// Display Table create form on GET.
exports.table_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table create GET');
};

// Handle Table create on POST.
exports.table_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table create POST');
};

// Display Table delete form on GET.
exports.table_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete GET');
};

// Handle Table delete on POST.
exports.table_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete POST');
};

// Display Table update form on GET.
exports.table_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table update GET');
};

// Handle table update on POST.
exports.table_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table update POST');
};
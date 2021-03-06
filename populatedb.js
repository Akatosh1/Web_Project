#! /usr/bin/env node

var userArgs = process.argv.slice(2);

var async = require('async')
var Food = require('./models/food')
var Drink = require('./models/drink')
var Table = require('./models/table')
var Trap = require('./models/trap')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var drinks = []
var foods = []
var tables = []
var traps = []

function trapCreate(address, text, cb){
  trapdetail = {address:address, text:text}

  var trap = new Trap(trapdetail);

  trap.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New IP: ' + trap);
    traps.push(trap)
    cb(null, trap)
  }  );
}

function drinkCreate(name, price, calories, description, picture, cb) {
  drinkdetail = {name:name , price: price, calories: calories , description: description, picture:picture}
  
  var drink = new Drink(drinkdetail);
       
  drink.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Drink: ' + drink);
    drinks.push(drink)
    cb(null, drink)
  }  );
}


function foodCreate(name, price, calories, ingredients, recommend_drink, summary, picture, cb) {
  fooddetail = { 
    name: name,
    price: price,
    calories: calories,
    ingredients: ingredients,
    recommend_drink: recommend_drink,
    summary: summary,
    picture: picture
  }
    
  var food = new Food(fooddetail);    
  food.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Food: ' + food);
    foods.push(food)
    cb(null, food)
  }  );
}


function TableCreate(persons, status, owner, time, cb) {
  tabledetail = {persons: persons}
  if (status != false) tabledetail.status = status
  if (owner != false) tabledetail.owner = owner
  if (time != false) tabledetail.time = time
    
  var table = new Table(tabledetail);    
  table.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Table: ' + table);
      cb(err, null)
      return
    }
    console.log('New Table: ' + table);
    tables.push(table)
    cb(null, table)
  }  );
}

function createTraps(cb){
   async.series([function(callback){trapCreate("Айпи", "Тест", callback)}], cb);
}


function createDrinks(cb) {
    async.series([
        function(callback) {
          drinkCreate('Кола', '40 руб.', '300 ccal', 'Кола как кола', 'cola', callback);
        },
        function(callback) {
          drinkCreate('Спрайт', '50 руб.', '250 ccal', 'Почти как кола только без красителя', 'sprite', callback);
        },
        function(callback) {
          drinkCreate('Фанта', '45 руб.', '320 ccal', 'Как кола только с другим красителем', 'fanta', callback);
        },
        function(callback) {
          drinkCreate('Бабулин морс', '80 руб.', '234 ccal', 'Вкуснейший морс из ягод с бабулиного огорода', 'mors', callback);
        },
        function(callback) {
          drinkCreate('Алкогольный напиток Дедовский самогон', '150 руб.', 'знает только сам дед', 'Для самых отчаянных', 'samogon', callback);
        },
        function(callback) {
          drinkCreate('Пиво Балтика', '110 руб.', '435 cl', 'Безалкогольное', 'pivo', callback);
        }
        ],
        cb);
}


function createFoods(cb) {
    async.parallel([
        function(callback) {
          foodCreate('Пирог с мясом', '199 руб.', '654 ccal', 'Вкуснейшая свинина со множеством приправ, тесто дрожжевое', 'Бабулин морс', 'Фирменный пирог от бабули', 'pirog_s_miasom', callback);
        },
        function(callback) {
          foodCreate('Пицца Пепперони', '430 руб.', '560 ccal', 'сыр Моцарелла, Пепперони, кетчуп Heinz, Базилик, помидоры, огурцы маринованные', 'Кола', 'Бабуля умеет не только печь пироги но и готовить пиццу на толстом тесте', 'pizza_pepperoni', callback);
        },
        function(callback) {
          foodCreate('Беляш сочный', '80 руб.', '348 ccal', 'Мясной фарш(свинина), тесто дрожжевое', 'Бабулин морс', 'Ну куда же без бабулиных беляшей', 'belyash', callback);
        },
        function(callback) {
          foodCreate('Хачапури', '70 руб.', '301 ccal', 'Сыр Российский, тесто слоеное', 'Спрайт', 'вкуснейший пирог от бабули', 'hachapuri', callback);
        },
        function(callback) {
          foodCreate('Пирог с рыбой', '253 руб.', '540 ccal', 'Филе рыбное, тесто дрожжевое', 'Алкогольный напиток Дедовский самогон', 'Не фирменный но тоже вкусный', 'pirog_s_riboi', callback);
        },
        function(callback) {
          foodCreate('Пирожок с капустой', '89 руб.', '249 ccal', 'Капуста свежая, тесто дрожжевое', 'Бабулин морс', 'Куда же без горячих пирожков', 'pirojok_s_kapustoi', callback);
        },
        function(callback) {
          foodCreate('Пирожок с картошкой', '79 руб.', '302 ccal', 'Картошка свежая, тесто дрожжевое', 'Бабулин морс', 'Куда же без горячих пирожков', 'pirojok_s_kartoshkoi', callback);
        }
        ],
        cb);
}


function createTables(cb) {
    async.parallel([
        function(callback) {
          TableCreate('2 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('2 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('2 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('2 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('4 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('4 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('4 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('4 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('4 персоны', false, false, false, callback)
        },
        function(callback) {
          TableCreate('6 персон', false, false, false, callback)
        },
        function(callback) {
          TableCreate('8 персон', false, false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createDrinks,
    createFoods,
    createTables,
    createTraps
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('TABLES: '+tables);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




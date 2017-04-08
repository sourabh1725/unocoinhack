var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pmayg'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Database connected as id ' + connection.threadId);
});
/* GET home page. */
router.get('/', function (req, res, next) {
  
  res.render('index', {title:"express"});
});

module.exports = router;

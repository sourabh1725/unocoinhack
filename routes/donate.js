var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shayog'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Database connected Doner as id ' + connection.threadId);
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    var query= null;
    var donersArray = null;
    query = connection.query('select * from doners',
    [], function(err, result, fields){
        if(err) throw err;
        console.log(result);
        donersArray = result;
        res.render('donate', {mydata:donersArray});
    });
    
    
});

module.exports = router;

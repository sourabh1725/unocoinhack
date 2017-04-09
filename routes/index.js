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

  console.log('Database connected as id ' + connection.threadId);
});
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: "express" });
});
router.post('/makewish', function (req, res, next) {
  var ACCOUNT_SID = 'ACc40cb452535b3a238db82765b0a4b2a7';
  var AUTH_TOKEN = '023ef7e314410cab7eb51cdb9a36dc71';
  var twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
  var query = null;
  var usr_mobile = req.body.user_mobile;
  var usr_name = req.body.user_name;
  var usr_need = req.body.user_need;
  var usr_bitaddress = req.body.user_bitaddress;
  var usr_reason = req.body.user_reason;
  console.log(res.body);
  function sendSmsTo(myphone, message) {
    twilio.messages.create({
      to: myphone,
      from: "+12246193053",
      body: message,
    }, function (err, message) {
      if (err) throw err;
      console.log(err, message)

    });
  }
  query = connection.query('insert into doners values (?,?,?,?,0.0,7,?,1)',
    [
      usr_bitaddress,
      usr_name,
      usr_reason,
      usr_need,
      usr_mobile,
    ], function (err, result, fields) {
      if(err) throw err;
      sendSmsTo(usr_mobile, "Your wish has been register hope it get fullfill soon");
      res.redirect('/donate');
    });
  
});

module.exports = router;

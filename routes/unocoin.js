var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Unocoin Api page');
});

router.post('/signup', function(req, res, next){
    res.send("register success");
});

router.post('/signin', function(req, res, next){
    res.send("sign up done");
});


module.exports = router;

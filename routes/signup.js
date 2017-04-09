var express = require('express');
var http = require('http');
var router = express.Router();
var qs = require("querystring");
var http = require("https");

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    var getAccessToken = null;
    console.log(process.env.NAME);

    res.render('signup', {});
});

router.post('/signup', function (req, res, next) {
    var usr_email = req.body.email_id;
    var usr_password = req.body.password;
    console.log(usr_email, usr_password + ' are user name and password');
    var qs = require("querystring");
    var http = require("https");

    var options = {
        "method": "POST",
        "hostname": "sandbox.unocoin.co",
        "port": null,
        "path": "/api/v1/authentication/signin",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": "Bearer "+process.env.ACCESS_TOKEN,
            "cache-control": "no-cache",
            "postman-token": "0fc71abc-b430-ce58-a6ce-5dcf88601c50"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.write(qs.stringify({
        email_id: 'itssuryapratap@gmail.com',
        signinpassword: 'surya@123',
        response_type: 'code',
        client_id: 'N8CGRMLYG6',
        redirect_uri: 'http://sandbox.unocoin.co',
        scope: 'all',
        signinsecpwd: '999999'
    }));
    req.end();
});

module.exports = router;

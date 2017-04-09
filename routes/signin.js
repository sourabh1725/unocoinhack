var express = require('express');
var mytoken = null;
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
router.get('/signin', function (req, res, next) {
    res.render('signin');
});

router.post('/signin', function (req, resp, next) {
    var query = null;
    var usr_email = req.body.email_id;
    var usr_password = req.body.password;
    console.log(usr_email, usr_password + ' are user name and password');
    function getAccessToken(user_code) {
        var qs = require("querystring");
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "sandbox.unocoin.co",
            "port": null,
            "path": "/oauth/token",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": "Basic TjhDR1JNTFlHNjoxYWU0YTExMS0xNjljLTRmZmEtOThlYS02ZmVjYjZlYTQwYWM=",
                "cache-control": "no-cache",
                "postman-token": "93d36a3f-dfb8-11cb-5112-be034bc55df6"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var myres = JSON.parse(body);
                console.log(body.toString(), 'my access token '+myres.access_token);
                mytoken= myres.access_token;
                resp.redirect('/bankdetails/'+mytoken);
            });
        });

        req.write(qs.stringify({
            code: user_code,
            redirect_uri: 'http://sandbox.unocoin.co',
            grant_type: 'authorization_code',
            access_lifetime: '99959556565'
        }));
        req.end();
    }//end of getAccessToken
    var qs = require("querystring");
    var http = require("https");

    var options = {
        "method": "POST",
        "hostname": "sandbox.unocoin.co",
        "port": null,
        "path": "/api/v1/authentication/signin",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": "Bearer " + process.env.ACCESS_TOKEN,

        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var myres = JSON.parse(body);
            console.log(myres.code);
            console.log(body.toString());
            getAccessToken(myres.code);
            
        });
    });

    req.write(qs.stringify({
        email_id: usr_email,
        signinpassword: usr_password,
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: 'http://sandbox.unocoin.co',
        scope: 'all',
        signinsecpwd: '999999'
    }));
    req.end();
});

module.exports = router;

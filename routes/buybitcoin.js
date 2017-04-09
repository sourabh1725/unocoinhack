var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/buy/:token/:inr', function (req, resp, next) {
    var mytoken = req.params.token;
    var inr = req.params.inr;
    function getBitcoinPrice(mytoken, inr) {
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "sandbox.unocoin.co",
            "port": null,
            "path": "/api/v1/general/prices",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": "Bearer " + mytoken,
                "cache-control": "no-cache",
                "postman-token": "c9601bc8-0168-5298-ed81-e411d1ab9eb7"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var price_data = JSON.parse(body.toString());
                var fee = price_data.buyfees;
                var tax = price_data.buytax;
                var price = price_data.buy_24_rates[0].buy_price;
                console.log(fee, tax, price);
                buyBitcoin(inr, fee, tax, price);
            });
        });

        req.end();
    }
    function buyBitcoin(inr, fee, tax, price) {
        var mybtc = inr/price;
        var myfee = Math.round(inr*0.01);
        var mytax = Math.round(myfee*0.15);
        var mytotal = (parseInt(inr)+parseInt(myfee)+parseInt(mytax));
        console.log(mybtc, myfee, mytax,mytotal, price, inr);
        var qs = require("querystring");
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "sandbox.unocoin.co",
            "port": null,
            "path": "/api/v1/trading/buyingbtc",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": "Bearer "+mytoken,
                "cache-control": "no-cache",
                "postman-token": "ca72c635-df7d-76a1-9f51-51f236447060"
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
                resp.json(JSON.parse(body.toString()));
            });
        });

        req.write(qs.stringify({
            destination: 'My wallet',
            inr: inr,
            total: mytotal,
            btc: mybtc,
            fee: myfee,
            tax: mytax,
            rate: price
        }));
        req.end();

    }
    getBitcoinPrice(mytoken, inr);
});

module.exports = router;

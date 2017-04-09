var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/send/:token/:myaddress/:btc', function (req, resp, next) {
    var mytoken = req.params.token;
    var mybtc = req.params.btc;
    var my_bitcoin_address = req.params.myaddress;
    function sendbitcoin(mytoken, mybtc) {
        var qs = require("querystring");
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "sandbox.unocoin.co",
            "port": null,
            "path": "/api/v1/wallet/sendingbtc",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": "Bearer "+mytoken,
                "cache-control": "no-cache",
                "postman-token": "43c846de-b758-0d88-c09c-6c802a7b74ee"
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
            to_address: my_bitcoin_address,
            btcamount: mybtc
        }));
        req.end();
    }
    sendbitcoin(mytoken, mybtc);
});

module.exports = router;

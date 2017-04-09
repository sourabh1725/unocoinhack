var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/deposit/:token/:amount', function (req, resp, next) {
    var mytoken = req.params.token;
    var myamount = req.params.amount;
    function depositFunds(mytoken, myamount) {
        var qs = require("querystring");
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "sandbox.unocoin.co",
            "port": null,
            "path": "/api/v1/wallet/inr_deposit",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": "Bearer "+mytoken,
                "cache-control": "no-cache",
                "postman-token": "e35f57e7-0936-259d-1caa-00757f6d69c9"
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

        req.write(qs.stringify({ inr_amount: myamount }));
        req.end();
    }//end of depositFunds
    depositFunds(mytoken, myamount);
});

module.exports = router;

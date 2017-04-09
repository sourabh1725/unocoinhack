var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/bankdetails/:token', function(req, resp, next){
var mytoken = req.params.token;
var user_data = {};
function getBankDetails(mytoken){
    var http = require("https");

var options = {
  "method": "POST",
  "hostname": "sandbox.unocoin.co",
  "port": null,
  "path": "/api/v1/wallet/viewbankaccount",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "authorization": "Bearer "+mytoken,
    "cache-control": "no-cache",
    "postman-token": "e9fde128-6b01-9004-f893-79acb4434ac1"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var bank_info = JSON.parse(body.toString());
    console.log(bank_info.bankdetails, 'is json obj');
    user_data["bank_details"] = bank_info.bankdetails[0];
    console.log(body.toString());
    console.log(bank_info.bankdetails[0]);
    resp.json(bank_info.bankdetails[0]); 
  });
});

req.end();
}//end of bankdetails
console.log(mytoken+' is my token');
getBankDetails(mytoken);
   
});

module.exports = router;

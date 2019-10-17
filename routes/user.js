'use strict';
var request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../libs/woocommerceProxy');
const router = express.Router();
router.use(bodyParser.json());

var getWPToken = function(req, res){
    var options;
    // Configure the request
    options = {
        url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/token?username='+req.query.username+'&password='+req.query.passwd+'',
        method: 'POST' 
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({
               success: true,
               message: "Successfully get the token", 
               posts: JSON.parse(body)
            });
        } else {
             console.log(error);
        }
    });
   };

   var verifyToken = function(req, res){
    var options;
    // Configure the request
    options = {
        url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/token/validate',
        headers: {
            'Authorization': 'Bearer '+ req.query.token
          },
        method: 'POST' 
    }
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({
               success: true,
               message: "Successfully get the token", 
               posts: JSON.parse(response.body)
            });
        } else {
            console.log("debug : " + response.statusCode);
             console.log(error);
        }
    });
   };

router.post('/login', function(req, res){
    getWPToken(req, res);

});
router.get('/login/testToken', function(req, res){
    verifyToken(req, res);

});

module.exports = router;

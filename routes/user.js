'use strict';
var request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../lib/woocommerceProxy');
const router = express.Router();
router.use(bodyParser.json());

var getWPToken = function(req, res, username, passwd){
    var options;
    // Configure the request
    options = {
        url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/token?username='+username+'&password='+passwd+'',
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
  router.post('/', function(req, res){
        console.log(req.query.username);
        getWPToken(req, res, req.query.username, req.query.passwd);
  });

module.exports = router;

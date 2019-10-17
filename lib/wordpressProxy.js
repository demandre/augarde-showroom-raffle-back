'use strict';
var request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../lib/woocommerceProxy');
const router = express.Router();
//const Product = require('../models/product');
//const logger = function(req, res, next) {
    //console.log(req.method + " product " + req.url);
    //next();
//};
router.use(bodyParser.json());
//router.use(logger);

WPCall() 
    // Configure the request
    options = {
        url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/',
        method: 'GET',
        headers: headers
    }

        // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                res.send({
                    success: true,
                    message: "Successfully fetched a list of post", 
                    posts: JSON.parse(body)
                });
        } else {
             console.log(error);
        }
     });
    }
    
module.exports = router;

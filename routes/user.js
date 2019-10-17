'use strict';
var request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../libs/woocommerceProxy');
const router = express.Router();
const TokenHelper = require('../utils/tokenHelper');
//const UserCollection = require('../models/collections/userCollection')
router.use(bodyParser.json());
let userCollection = require('../models/collections/userCollection');

router.post('/login', function(req, res){
    getWPToken(req, res);
    TokenHelper.getWPToken(req, res);
});
router.get('/login/testToken', async function(req, res){
    TokenHelper.verifyToken(req, res);
    const product = await APIWooCommerce.getWatches();
    console.log(userCollection);
    return res.json(product);
});


module.exports = router;

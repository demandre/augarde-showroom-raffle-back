'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../libs/woocommerceProxy');
const router = express.Router();
const Product = require('../models/product');
const logger = function(req, res, next) {
    console.log(req.method + " product " + req.url);
    next();
};
router.use(bodyParser.json());
router.use(logger);

router.post('/login', async (req, res, next) => {
    try {
        const productsWooCommerce = await APIWooCommerce.getAllProducts();
        return res.json(productsWooCommerce.data);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});
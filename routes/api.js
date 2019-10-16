'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../lib/woocommerceProxy');
const router = express.Router();
const Product = require('../models/product');
const logger = function(req, res, next) {
    console.log(req.method + " product " + req.url);
    next();
};
router.use(bodyParser.json());
router.use(logger);

router.get('/all', async (req, res, next) => {
    try {
        const productsWooCommerce = await APIWooCommerce.getAllProducts();
        return res.json(productsWooCommerce.data);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
        try {
            if (req.params.id) {
                const productWooCommerce = await APIWooCommerce.getProduct(req.params.id);
                const product            = new Product(productWooCommerce.data);
                return res.json(product);
            }
        } catch (err) {
            console.log("ERROR: " + err.message);
            return res.sendStatus(500);
        }
        return res.sendStatus(404);
    }
);

router.get('/watch', async (req, res, next) => {
    try {
        const watches = await APIWooCommerce.getWatches();
        res.json(watches);
    }
    catch (err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }

});

router.get('/cadran', async (req, res, next) => {
    try {
        const cadrans = await APIWooCommerce.getCadrans();
        res.json(cadrans);
    }
    catch (err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

router.get('/bracelet', async (req, res, next) => {
    try {
        const bracelets = await APIWooCommerce.getBracelets();
        res.json(bracelets);
    }
    catch (err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});
module.exports = router;

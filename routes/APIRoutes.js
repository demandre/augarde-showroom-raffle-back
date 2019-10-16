'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../controllers/API');
const router = express.Router();
const Product = require('../models/product');
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    console.log("API routes");
    try {
        if (req.query.id) {
            const productWooCommerce = await APIWooCommerce.getProduct(req.query.id);
            const product = new Product(productWooCommerce.data);
            return res.json(product);
            //return res.status(500).end();
        }
        else {
            const productsWooCommerce = await APIWooCommerce.getAllProducts();
            res.status(200);
            return res.json(productsWooCommerce.data);
        }
    }
    catch(err) {
        res.status(404);
        console.log(err);
    }
});

router.get('/watch', async (req, res, next) => {

    try {
        console.log("watch route");
        const watches = await APIWooCommerce.getWatches();
        res.json(watches);
    }
    catch (err) {
        res.status(404);
        console.log(err);
    }

});

router.get('/cadran', async (req, res, next) => {

    try {
        console.log("cadran route");
        const cadrans = await APIWooCommerce.getCadrans();
        res.json(cadrans);
    }
    catch (err) {
        res.status(404);
        console.log(err);
    }
});

router.get('/bracelet', async (req, res, next) => {

    try {
        console.log("bracelet route");
        const bracelets = await APIWooCommerce.getBracelets();
        res.json(bracelets);
    }
    catch (err) {
        res.status(404);
        console.log(err);
    }
});
module.exports = router;

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const APIWooCommerce = require('../controllers/API');
const router = express.Router();
const Product = require('../models/product');
router.use(bodyParser.json());

router.get('/all', async (req, res, next) => {
    try {
        console.log("get /all products");
        const productsWooCommerce = await APIWooCommerce.getAllProducts();
        res.status(200);
        return res.json(productsWooCommerce.data);
    }
    catch(err) {
        res.status(404);
        console.log(err);
    }
});

router.get('/:id', async (req, res, next) => {
        try {
            console.log("get " + req.params.id + " product");
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

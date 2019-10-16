'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const API = require('../controllers/API');
const router = express.Router();
const Product = require('../models/product');
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    console.log("API routes");
    try {
        if (req.query.id) {
            const product = await API.getProduct(req.query.id);
            const product2 = new Product(product.data);
            if (product2) {

                return res.json(product2);
            }
            return res.status(500).end();
        }
        else {
            const products = await API.getAllProducts();
            //console.log("products : " + products.data);
            res.status(200);
            return res.json(products.data);
        }
    }
    catch(err) {
        res.status(404);
        console.log(err);
    }
});

module.exports = router;

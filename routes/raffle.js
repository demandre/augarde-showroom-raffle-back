'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const RaffleCollection = require('../models/collections/raffleCollection')
const router = express.Router();
const logger = function(req, res, next) {
    console.log(req.method + " raffle " + req.url);
    next();
};

router.use(bodyParser.json());
router.use(logger);

router.get('/all', async (req, res, next) => {
    try {
        let raffleCollection = new RaffleCollection();
        raffleCollection.load();

        return res.json('ok');
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

module.exports = router;

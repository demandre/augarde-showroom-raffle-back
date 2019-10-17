'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const RaffleCollection = require('../models/collections/raffleCollection');
const SubscriberCollection = require('../models/collections/raffleSubscriberCollection');
const Database = require('../libs/Database');
const router = express.Router();
const logger = function(req, res, next) {
    console.log(req.method + " raffle " + req.url);
    next();
};

router.use(bodyParser.json());
router.use(logger);

let connection = null;
async function initConnection() {
    connection = await new Database();
}
initConnection();

router.get('/all', async (req, res, next) => {
    try {
        let raffleCollection = new RaffleCollection(connection);
        await raffleCollection.load();
        return res.json(raffleCollection.collection);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let raffleCollection = new RaffleCollection(connection);
        await raffleCollection.load(req.params.id);
        return res.json(raffleCollection.collection);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

router.post('/subscribe', async (req, res, next) => {
    try {
        //TODO: verify token and get email
        await SubscriberCollection.get({
            raffleId: req.params.raffleId,
            customerEmail: req.params.customerEmail,
        });
        return res.json(SubscriberCollection.collection);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

module.exports = router;

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const RaffleCollection = require('../models/collections/raffleCollection');
const RaffleSubscriberCollection = require('../models/collections/raffleSubscriberCollection');
const Database = require('../libs/database');
const TokenHelper = require('../libs/tokenHelper');
const router = express.Router();

router.use(bodyParser.json());

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

router.get('/share', async (req, res, next) => {
    try {
        let raffleSubscriberCollection = new RaffleSubscriberCollection(connection);
console.log(req.query);
        await raffleSubscriberCollection.load({
            raffleId: req.query.raffleId,
            customerEmail: req.query.customerEmail,
        });

        if(raffleSubscriberCollection.collection.length) {
            await raffleSubscriberCollection.collection[0].addSharedPoints(connection);
        } else {
            return res.sendStatus(403);
        }

        return res.sendStatus(200);
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
        //TokenHelper.verifyToken(req, res);

        let raffleSubscriberCollection = new RaffleSubscriberCollection(connection);

        await raffleSubscriberCollection.load({
            raffleId: req.body.raffleId,
            customerEmail: req.body.customerEmail,
        });

        if(raffleSubscriberCollection.collection.length) {
            return res.sendStatus(403);
        } else {
            await raffleSubscriberCollection.subscribe({
                raffleId: req.body.raffleId,
                customerEmail: req.body.customerEmail,
            });
            if(raffleSubscriberCollection.collection.length) {
                return res.json({"share_link": raffleSubscriberCollection.collection[0].getShareLink()});
            } else {
                return res.sendStatus(500);
            }
        }

        return res.json(raffleSubscriberCollection.collection);
    }
    catch(err) {
        console.log("ERROR: " + err.message);
        return res.sendStatus(500);
    }
});

module.exports = router;

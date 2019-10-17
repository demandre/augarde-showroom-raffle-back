'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const RaffleCollection = require('../models/collections/raffleCollection');
const RaffleSubscriberCollection = require('../models/collections/raffleSubscriberCollection');
const Database = require('../libs/database');
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
        let raffleSubscriberCollection = new RaffleSubscriberCollection(connection);
        //verify token if not 403
        await raffleSubscriberCollection.load({
            raffleId: req.body.raffleId,
            customerEmail: req.body.customerEmail,
        });

        if(raffleSubscriberCollection.collection.length) {
            return res.sendStatus(403);
        } else {
            raffleSubscriberCollection.subscribe({
                raffleId: req.params.raffleId,
                customerEmail: req.params.customerEmail,
            });
            if(raffleSubscriberCollection.collection.length) {
                //create share link and return it (wp page ?useremail)
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

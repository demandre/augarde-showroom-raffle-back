'use strict';
const Database = require('../../libs/database');
const Raffle = require('../raffle');

class RaffleCollection {
    constructor() {
        this.connection = null;
        this.collection = [];
    }

     async load(raffleId) {
        if(raffleId) {
            return this;
        } else {
            this.connection = await new Database();
            this.connection.query("SELECT * FROM raffle_entity", function (err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                result.forEach(raffleData => {
                    let raffle = new Raffle(raffleData);
                    this.collection.push(raffle);
                });
            }.bind(this));
            return this;
        }
    }
}

module.exports = RaffleCollection;
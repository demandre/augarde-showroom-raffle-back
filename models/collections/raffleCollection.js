'use strict';
const Database = require('../../libs/database');
const Raffle = require('../raffle');

class RaffleCollection {
    constructor() {
        this.connection = null;
        this.collection = [];
    }

    async init() {
        this.connection = await new Database();
    }

    load(raffleId) {
     return new Promise(async (resolve, reject) => {
         if(this.connection === null) {
             await this.init();
         }
         this.collection = [];
         let query = "";

         if(raffleId) {
             query = `SELECT * FROM raffle_entity WHERE id = ${raffleId}`;
         } else {
             query = `SELECT * FROM raffle_entity`;
         }

         this.connection.query(query, function (err, result, fields) {
             if (err) {
                 console.log(err);
                 resolve(this);
                 return;
             }

             result.forEach(raffleData => {
                 let raffle = new Raffle(raffleData);
                 this.collection.push(raffle);
             });
             resolve(this);
         }.bind(this));
     });
    }
}

module.exports = RaffleCollection;
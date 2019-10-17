'use strict';
const Raffle = require('../raffle');

class RaffleCollection {
    constructor(connection) {
        this.connection = connection;
        this.collection = [];
    }

    load(raffleId) {
     return new Promise(async (resolve, reject) => {
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
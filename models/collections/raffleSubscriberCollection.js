'use strict';
const Database = require('../../libs/database');
const RaffleSubscriber = require('../raffleSubscriber');

class RaffleSubscriberCollection {
    constructor() {
        this.connection = null;
        this.collection = [];
    }

    async init() {
        this.connection = await new Database();
    }

    load(options) {
     return new Promise(async (resolve, reject) => {
         if(this.connection === null) {
             await this.init();
         }
         this.collection = [];
         let query = "";

         if(options.raffleId) {
             if(options.customerEmail) {
                 query = `SELECT * FROM raffle_subscriber 
                            WHERE raffle_id = ${options.raffleId} 
                            AND subscriber_email = ${options.customerEmail}`;
             }
             query = `SELECT * FROM raffle_subscriber WHERE raffle_id = ${options.raffleId}`;
         } else {
             query = `SELECT * FROM raffle_subscriber`;
         }

         this.connection.query(query, function (err, result, fields) {
             if (err) {
                 console.log(err);
                 resolve(this);
                 return;
             }

             result.forEach(subscriberData => {
                 let subscriber = new RaffleSubscriber(subscriberData);
                 this.collection.push(subscriber);
             });
             resolve(this);
         }.bind(this));
     });
    }
}

module.exports = RaffleCollection;
'use strict';
const RaffleSubscriber = require('../raffleSubscriber');

class RaffleSubscriberCollection {
    constructor(connection) {
        this.connection = connection;
        this.collection = [];
    }

    load(options) {
     return new Promise(async (resolve, reject) => {
         this.collection = [];
         let query = "";

         if(options.raffleId) {
             if(options.customerEmail) {
                 query = `SELECT * FROM raffle_subscriber 
                            WHERE raffle_id = ${options.raffleId} 
                            AND customer_email = '${options.customerEmail}'`;
             } else {
                 query = `SELECT * FROM raffle_subscriber WHERE raffle_id = ${options.raffleId}`;
             }
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

module.exports = RaffleSubscriberCollection;
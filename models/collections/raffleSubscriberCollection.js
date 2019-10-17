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
             }

             result.forEach(subscriberData => {
                 let subscriber = new RaffleSubscriber(subscriberData);
                 this.collection.push(subscriber);
             });
             resolve(this);
         }.bind(this));
     });
    }

    subscribe(options) {
        return new Promise(async (resolve, reject) => {
            this.collection = [];
            let query = "";

            if(options.raffleId) {
                if(options.customerEmail) {
                    query = `INSERT INTO raffle_subscriber (raffle_id,customer_email)
                            VALUES (${options.raffleId},'${options.customerEmail}')`;
                } else {
                    resolve(this);
                }
            } else {
                resolve(this);
            }

            this.connection.query(query, async function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(this);
                }
                if(result.affectedRows) {
                    await this.load(options);
                    await this.collection[0].initPoints(this.connection);
                    resolve(this);
                }
                resolve(this);
            }.bind(this));
        });
    }
}

module.exports = RaffleSubscriberCollection;
'use strict';
const RaffleCollection = require('../models/collections/raffleCollection');

class RaffleSubscriber {
    constructor(data) {
        this.id = data.id;
        this.raffleId = data.raffle_id;
        this.customerEmail = data.customer_email;
        this.pointTotal = data.point_total;
        this.isWinner = data.is_winner;
        this.notifiedAt = data.notified_at;
    }

    getShareLink() {
        return 'http://vps676674.ovh.net/share.php?customerEmail=' + this.customerEmail;
    }

    initPoints(connection) {
        return new Promise(async (resolve, reject) => {
            let seniorityQuery = `SELECT count (*) from raffle_subscriber WHERE customer_email= '${this.customerEmail}'`;

            connection.query(seniorityQuery, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(this);
                    return;
                }

                result.forEach(function(row){
                    this.pointTotal = row['count (*)'] * 10;
                }.bind(this));
                console.log(this.pointTotal);


            }.bind(this));

            // Compute subscribe time bonus
            let raffleCollection = new RaffleCollection(connection);
            await raffleCollection.load(this.raffleId);
            let raffleSubscribeBeginning = raffleCollection.collection[0].subscribeBeginning;
            let subscribeTime = Math.floor((new Date() - raffleSubscribeBeginning) / (1000 * 60 * 60));
            let subscribeTimeBonus = 10 - subscribeTime;
            if(subscribeTimeBonus < 0) {
                subscribeTimeBonus = 0;
            }

            this.pointTotal += subscribeTimeBonus;

            let savePointsQuery = `UPDATE raffle_subscriber 
                                  set point_total = ${this.pointTotal}
                                  where raffle_id = ${this.raffleId} and customer_email = '${this.customerEmail}'`;

            connection.query(savePointsQuery, async function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(this);
                    return;
                }
            console.log(result);
            }.bind(this));

            resolve(this);
        });
    }
}
module.exports = RaffleSubscriber;
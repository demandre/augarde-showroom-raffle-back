'use strict';
const RaffleCollection = require('../models/collections/raffleCollection');
const https = require('https');

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

            await this.savePoints(connection);

            resolve(this);
        });
    }

    savePoints(connection) {
        return new Promise(async (resolve, reject) => {
            let savePointsQuery = `UPDATE raffle_subscriber 
                                  set point_total = ${this.pointTotal}
                                  where raffle_id = ${this.raffleId} and customer_email = '${this.customerEmail}'`;

            connection.query(savePointsQuery, async function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(this);
                }
            }.bind(this));

            resolve(this);
        });
    }

    addSharedPoints(connection) {
        return new Promise(async (resolve, reject) => {
            this.pointTotal += 15;
            await this.savePoints(connection);
            resolve(this);
        });
    }

    win(connection) {
        return new Promise(async (resolve, reject) => {
            this.isWinner = true;

            let smsData = {
                'key' : '6a72611598efa202af944feb5631b849',
                'destinataires' : '+33630147054',
                'type' : 'premium',
                'message' : 'Vous avez été tiré au sort pour la raffle! Rendez-vous rapidement sur www.augarde.com, les stocks sont limités!',
                'expediteur' : 'Augarde',
                'date' : '',
            };
            let smsRequest = 'https://www.spot-hit.fr/api/envoyer/sms?';
            for(let param in smsData) {
                smsRequest += param + '=' + encodeURI(smsData[param])+'&';
            }
            https.get(smsRequest);

            await this.saveWin(connection);

            resolve(this);
        });
    }

    saveWin(connection) {
        return new Promise(async (resolve, reject) => {
            let savePointsQuery = `UPDATE raffle_subscriber 
                                  set is_winner = ${this.isWinner}, notified_at = NOW()
                                  where raffle_id = ${this.raffleId} and customer_email = '${this.customerEmail}'`;

            console.log(savePointsQuery);
            connection.query(savePointsQuery, async function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(this);
                }
            }.bind(this));

            resolve(this);
        });
    }
}
module.exports = RaffleSubscriber;
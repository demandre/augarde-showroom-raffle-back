'use strict';
const RaffleSubscriberCollection = require('../models/collections/raffleSubscriberCollection');
const chooser = require("random-seed-weighted-chooser").default;

class Raffle {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.productId = data.product_id;
        this.subscribeBeginning = data.subscribe_beginning;
        this.subscribeEnd = data.subscribe_end;
        this.nbWinner = data.nb_winner;
    }

    initWinners(connection) {
        return new Promise(async (resolve, reject) => {
            let raffleSubscriberCollection = new RaffleSubscriberCollection(connection);
            await raffleSubscriberCollection.load({'raffleId': this.id});

            let raffleWinners = [];
            for (let i = 0; i < this.nbWinner; i++) {
                let raffleWinner = chooser.chooseWeightedObject(raffleSubscriberCollection.collection,'pointTotal');
                raffleSubscriberCollection.collection = raffleSubscriberCollection.collection.filter(
                    subscriber => subscriber.customerEmail !== raffleWinner.customerEmail
                );
                raffleWinners.push(raffleWinner);
            }

            raffleWinners.forEach(function (raffleWinner){
                raffleWinner.win(connection);
            });

            resolve(this);
        });
    }
}

module.exports = Raffle;
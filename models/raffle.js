'use strict';
const RaffleSubscriberCollection = require('../models/collections/raffleSubscriberCollection');

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

            // RaffleSubscriberCollection - now choose winners
            raffleSubscriberCollection.collection.forEach( function(raffleSubscriber) {
                console.log(raffleSubscriber);
            });
            let raffleWinners = raffleSubscriberCollection.collection;

            raffleWinners.forEach(function(raffleSubscriber) {
                raffleSubscriber.win(connection);
            });

            resolve(this);
        });
    }
}

module.exports = Raffle;
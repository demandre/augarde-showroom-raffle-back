'use strict';

class Raffle {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.productId = data.product_id;
        this.subscribeBegining = data.subscribe_begining;
        this.subscribeEnd = data.subscribe_end;
        this.nbWinner = data.nb_winner;
    }
}

module.exports = Raffle;
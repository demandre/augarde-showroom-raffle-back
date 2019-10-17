'use strict';

class RaffleSubscriber {
    constructor(data) {
        this.id = data.id;
        this.raffleId = data.raffle_id;
        this.customerEmail = data.customer_id;
        this.pointTotal = data.point_total;
        this.isWinner = data.is_winner;
        this.notifiedAt = data.notified_at;
    }
}
module.exports = RaffleSubscriber;
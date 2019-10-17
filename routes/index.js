'use strict';

class RouterBuilder {
   build(app) {
        app.use('/product', require('./api'));
        app.use('/raffle', require('./raffle'));
    }
}

module.exports = new RouterBuilder();
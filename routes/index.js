'use strict';

class RouterBuilder {
   build(app) {
        app.use('/product', require('./product'));
        app.use('/raffle', require('./raffle'));
        app.use('/user', require('./user'))
   }
}

module.exports = new RouterBuilder();
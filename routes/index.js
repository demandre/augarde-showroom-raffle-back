'use strict';

class RouterBuilder {
   build(app) {
        app.use('/product', require('./api'))
    }
}

module.exports = new RouterBuilder();
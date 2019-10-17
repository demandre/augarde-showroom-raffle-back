'use strict';

class RouterBuilder {
   build(app) {
        app.use('/product', require('./api')),
        app.use('/user', require('./user'))
    }  
}

module.exports = new RouterBuilder();
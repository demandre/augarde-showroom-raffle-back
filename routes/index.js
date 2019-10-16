'use strict';

const database = require('../models/database');
class RouterBuilder {
   build(app) {
        app.use('/product', require('./api'))
    }
}

module.exports = new RouterBuilder();
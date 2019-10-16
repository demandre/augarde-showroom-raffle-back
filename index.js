'use strict';
//tous les imports :
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routerBuilder = require('./routes');
const API = require('./controllers/API');

const app = express();
/*app.use( (req, res, next ) => {
    req.API = API;
    next();
});
*/

routerBuilder.build(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}...`));

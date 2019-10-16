'use strict';
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routerBuilder = require('./routes');

const app = express();

routerBuilder.build(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}...`));

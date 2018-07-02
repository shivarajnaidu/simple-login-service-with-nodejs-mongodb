'use strict';
require('dotenv').config();
const express = require('express');
const PORT = process.env.NODE_PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes')(app);


app.listen(PORT, () => {
    const message = `Server Listening On Port ${PORT}`;
    console.log(message);
});
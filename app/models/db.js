'use strict';
const mongoose = require('mongoose');
const config = require('config');
const dbURL = config.get('db.uri');
// console.log(dbURL)


async function connectToDB() {
    try {
        await mongoose.connect(dbURL);
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
        process.exit(1);
    }
    
}

connectToDB();



const db = mongoose.connection;
// db.on('error', console.error('connection error while connecting to DB'));
// db.once('open', function() {
// 	console.log('Succefully Connected To DB');
// });


module.exports = db;
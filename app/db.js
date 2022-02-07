'use strict';

const mongoose = require('mongoose');
const config = require('config');

const dbURL = config.get('DB_URL');
// console.log(dbURL)

if (!dbURL) {
  // eslint-disable-next-line no-console
  console.error('DB URL empty');
  process.exit(1);
}

async function connectToDB() {
  // eslint-disable-next-line no-console
  console.log(`Connecting to Databse ${dbURL}`);

  try {
    await mongoose.connect(dbURL);

    // eslint-disable-next-line no-console
    console.log('Succefully Connected To DB');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database Connection Failed');
    process.exit(1);
  }
}

connectToDB();

const db = mongoose.connection;
// db.on('error', console.error('connection error while connecting to DB'));
// db.once('open', function() {
// console.log('Succefully Connected To DB');
// });

module.exports = db;

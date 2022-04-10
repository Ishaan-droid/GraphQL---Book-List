const mongoose = require('mongoose');

const DB = process.env.DB_STRING;

const connectDB = () =>
  mongoose
    .connect(DB)
    .then(con => console.log('Connected to DB Successfully'))
    .catch(err => console.log(`Error in connecting to DB. ${err}`));

module.exports = { connectDB };

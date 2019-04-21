const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

const recordRoute = require('./server/routes/records');

/** Express Declaration */
const app = express();

/** Parse application/json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Connecting to the database */
mongoose.connect(dbConfig.url);
mongoose.connection.on('connected', (client) => {
    console.log('Connected to database');
});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database.');
});

/** For handling record routes */
app.use(recordRoute);

/** Handle for 404 */
app.use((req,res,next) => {
    res.status(404).send("There is no response");
});

/** Listen for requests */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
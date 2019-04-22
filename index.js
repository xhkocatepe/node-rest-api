const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const expressValidation = require('express-validation');

/** Record route path */
const recordRoute = require('./server/routes/records');

/** Express Declaration */
const app = express();

/** Parse application/json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Connecting to the database */
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', (client) => {
    console.log('Connected to database');
});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database.');
});

/** For handling record routes */
app.use(recordRoute);

/** Error Handling: Standart Error Object */
var oStaErr = {
    "code": 1,
    "msg": "Error",
    "errors": []
};

app.use((req, res, next) => {
    oStaErr.errors = [`Cannot find the url ${req.path}`];
    res.status(404).json(oStaErr);
});

app.use(function (err, req, res, next) {
    /* Distinguish Errors from ValidationErrors */
    if (err instanceof expressValidation.ValidationError) {
        var oValErr = JSON.parse(err);
        oStaErr.errors = err.errors;
    } else {
        oStaErr.errors = [err.message];
    }
    res.status(err.status || 500).json(oStaErr);
});

/** Listen for requests */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
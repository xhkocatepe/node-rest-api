/** express-validation library handles validation settings */
let recordCtrl = require('../controllers/records.js');
let validate = require('express-validation');
let express = require('express');
let validations = require('./validation/records');

let router = express.Router();

/** for taking 'records' path then send to record controller to get data */
router.post('/records',validate(validations.getRecords), recordCtrl.get);

module.exports = router;

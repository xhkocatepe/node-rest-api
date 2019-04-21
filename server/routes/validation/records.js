/** Joi library imports for field validations in request payload */
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

var validation = {
    /* Http POST Method path '/records' */
    getRecords: {
        body: {
            startDate: Joi.date().format('YYYY-MM-DD').required().raw(),
            endDate: Joi.date().format('YYYY-MM-DD').required().min(Joi.ref('startDate')).raw(),
            minCount: Joi.number().required(),
            maxCount: Joi.number().required().min(Joi.ref('minCount'))
        }
    },
};

module.exports = validation;

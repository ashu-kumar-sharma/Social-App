const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.body = !isEmpty(data.body) ? data.body : '';

    if (Validator.isEmpty(data.body)) {
        errors.text = 'Body field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
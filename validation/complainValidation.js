const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Body field is required';
    }

    data.concern = !isEmpty(data.concern) ? data.concern : '';

    if (Validator.isEmpty(data.concern)) {
        errors.concern = 'Body field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
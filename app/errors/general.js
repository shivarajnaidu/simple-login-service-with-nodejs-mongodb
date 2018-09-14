'use strict';
const uuid = require('uuid');

class BadRequestError extends Error {

    constructor(message, code) {
        super();
        this.code = 400;
        this.uid = uuid();
        this.message = message;
        this.code = code || this.code;
    }
}

module.exports = {
    BadRequestError
};
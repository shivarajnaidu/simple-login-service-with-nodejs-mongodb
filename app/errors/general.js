'use strict';
const uuid = require('uuid');

class BadRequestError extends Error {

    constructor(message, status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

module.exports = {
    BadRequestError
};
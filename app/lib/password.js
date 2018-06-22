'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(passWord) {
    if (!passWord) {
        const error = TypeError('Password Should Not Be Empty');
        throw error;
    }

    return await bcrypt.hash(passWord, saltRounds); // This will return promise..
}

async function match(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
        const error = TypeError('Password/Hash Should Not Be Empty');
        throw error;
    }

    return await bcrypt.compare(plainPassword, hashedPassword); // This will return promise..
}


module.exports = {
    hash,
    match
};
'use strict';
const mongoose = require('mongoose');
const uuid = require('uuid');
const config = require('config');
const { Schema, model } = mongoose;

const {
    tokenExpirePeriod
} = config.get('jwt');

const options = {
    timestamps: true
};

const AccessTokenSchema = new Schema({
    id: { type: String, default: uuid },
    userId: { type: String },
    token: { type: String },
}, options);

AccessTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: tokenExpirePeriod || 900 });

const AccessToken = model('accesstoken', AccessTokenSchema);

module.exports = AccessToken;
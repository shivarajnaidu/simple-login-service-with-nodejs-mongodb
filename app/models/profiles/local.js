'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: true
};

const getRequiredFiledMessage = (filed) => {
    const message = `${filed} Should Not Be Empty`;
    return [true, message];
};

const LocalProfileSchema = new Schema({
  id: { type: String, default: uuid },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  name: { type: String, required: getRequiredFiledMessage('Name') },
  password: { type: String, required: getRequiredFiledMessage('Password') },
  isEmailVerified: { type: Boolean, default: false },
  provider: { type: String, default: 'local' }
}, options);


const LocalProfile = mongoose.model('LocalProfile', LocalProfileSchema);
module.exports = LocalProfile;
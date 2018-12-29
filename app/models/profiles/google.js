'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: true
};

const getRequiredFiledMessage = filed => {
    const message = `${filed} Should Not Be Empty`;
    return [true, message];
};

const GoogleProfileSchema = new Schema({
  id: { type: String, default: uuid },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  googleId: { type: String, required: getRequiredFiledMessage('Google ID') },
  name: { type: String, required: getRequiredFiledMessage('Name') },
  provider: { type: String, default: 'google' }
}, options);


const GoogleProfile = mongoose.model('GoogleProfile', GoogleProfileSchema);
module.exports = GoogleProfile;
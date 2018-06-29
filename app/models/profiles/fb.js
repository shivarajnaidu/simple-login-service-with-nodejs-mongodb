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

const FBProfileSchema = new Schema({
  id: { type: String, default: uuid },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  fbId: { type: String, required: getRequiredFiledMessage('Facebook ID') },
  name: { type: String, required: getRequiredFiledMessage('Name') },
  provider: { type: String, default: 'facebook' }
}, options);


const FBProfile = mongoose.model('FBProfile', FBProfileSchema);
module.exports = FBProfile;
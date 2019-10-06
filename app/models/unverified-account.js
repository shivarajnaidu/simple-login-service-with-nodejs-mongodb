const uuid = require('uuid');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const UnVerifiedAccountSchema = new Schema({
  id: { type: String, default: uuid },
  name: { type: String, required: getRequiredFiledMessage('Name'), trim: true },
  email: {
    type: String, required: getRequiredFiledMessage('Email'), trim: true, unique: true,
  },
  password: { type: String, required: getRequiredFiledMessage('Password') },
  role: { type: String, default: 'user', trim: true },
}, options);

const UnVerifiedAccount = mongoose.model('UnVerifiedAccount', UnVerifiedAccountSchema);
module.exports = UnVerifiedAccount;

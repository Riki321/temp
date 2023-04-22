const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  programe: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  cfprofile: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isadmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  ismember: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
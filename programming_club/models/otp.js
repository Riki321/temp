const mongoose = require('mongoose');
//const conn = require('../config/db')

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expirein: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.model('otp', OtpSchema);

module.exports = otp;

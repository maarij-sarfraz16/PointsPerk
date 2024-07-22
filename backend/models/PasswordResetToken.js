const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordResetTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema)
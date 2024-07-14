const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  nameOfAgency: {
    type: String,
    required: true,
    trim: true
  },
  agencyAddress: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
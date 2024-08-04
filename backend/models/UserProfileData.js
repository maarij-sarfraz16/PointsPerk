const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserProfileDataSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  profilePictureUrl: {
    type: String,
    default: 'https://res.cloudinary.com/drlb3eani/image/upload/v1722537563/tnf5ax4za2k3cslb2zvq.png'
  }
});

module.exports = mongoose.model('UserProfileData', UserProfileDataSchema);
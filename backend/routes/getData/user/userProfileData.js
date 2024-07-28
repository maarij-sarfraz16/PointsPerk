const express = require('express');
const router = express.Router();
const multer = require('multer');

const User = require('../../../models/User');
const fetchUser = require('../../../middleware/fetchUser');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../../utilities/cloudinaryConnect');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const format = file.mimetype.split('/')[1];
    if (!['jpg', 'jpeg', 'png'].includes(format)) {
      throw new Error('Unsupported file format');
    }
    return {
      folder: 'profile_pictures',
      format: format,
      transformation: [{ width: 120, height: 120, crop: 'limit' }],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB size limit
 });


// ROUTE 1: Uploading user profile picture using POST "/api/getData/user/userProfileData/uploadProfilePicture"

router.post('/uploadProfilePicture', fetchUser, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Store the image URL in the user's profile
    user.profilePicture = req.file.path;
    await user.save();

    res.json({ success: true, profilePictureUrl: req.file.path });

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
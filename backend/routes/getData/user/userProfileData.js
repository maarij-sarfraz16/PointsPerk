const express = require('express');
const router = express.Router();
const multer = require('multer');

const UserProfileData = require('../../../models/UserProfileData');
const fetchUser = require('../../../middleware/fetchUser');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../../utilities/cloudinaryConnect');

const DEFAULT_PROFILE_PICTURE_URL = 'https://res.cloudinary.com/drlb3eani/image/upload/v1722537563/tnf5ax4za2k3cslb2zvq.png';

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
      transformation: [{ width: 120, height: 120, crop: 'auto' }],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB size limit
 });


// ROUTE 1: Upload user profile picture using POST "/api/getData/user/UserProfileData/uploadProfilePicture"

router.post('/uploadProfilePicture', fetchUser, upload.single('profilePicture'), async (req, res) => {
  try {
    const userProfileData = await UserProfileData.findOne({ user: req.user.id });
    if (!userProfileData) {
      return res.status(404).json({ error: 'User profile data not found' });
    }

    // Delete existing profile picture from Cloudinary if it is not the default one
    if (userProfileData.profilePictureUrl && userProfileData.profilePictureUrl !== DEFAULT_PROFILE_PICTURE_URL) {
      const oldProfilePictureUrl = userProfileData.profilePictureUrl;
      const oldProfilePicturePublicId = oldProfilePictureUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(oldProfilePicturePublicId);
    }

    // Store the image URL in the user's profile
    userProfileData.profilePictureUrl = req.file.path;
    await userProfileData.save();

    res.json({ success: true, profilePictureUrl: req.file.path });

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ROUTE 2: Delete user profile picture using POST "/api/getData/user/userProfileData/deleteProfilePicture"

router.post('/deleteProfilePicture', fetchUser, async (req, res) => {
  try {
    const userProfileData = await UserProfileData.findOne({ user: req.user.id });
    if (!userProfileData) {
      return res.status(404).json({ error: 'User profile data not found' });
    }

    // Delete existing profile picture from Cloudinary if it is not the default one
    if (userProfileData.profilePictureUrl && userProfileData.profilePictureUrl !== DEFAULT_PROFILE_PICTURE_URL) {
      const oldProfilePictureUrl = userProfileData.profilePictureUrl;
      const oldProfilePicturePublicId = oldProfilePictureUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(oldProfilePicturePublicId);
    }

    // Store the image URL in the user's profile
    userProfileData.profilePictureUrl = DEFAULT_PROFILE_PICTURE_URL;
    await userProfileData.save();

    res.json({ success: true, profilePictureUrl: DEFAULT_PROFILE_PICTURE_URL });

  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
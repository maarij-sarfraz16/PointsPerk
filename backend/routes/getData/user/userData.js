const express = require('express');
const router = express.Router();

const User = require('../../../models/User');
const UserProfileData = require('../../../models/UserProfileData');
const fetchUser = require('../../../middleware/fetchUser');


// ROUTE 1: Get loggedIn user details using GET "/api/getData/user/userData/fetchData"

router.get('/fetchData', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    const userProfileData = await UserProfileData.findOne({ user: userId });
    if (!userProfileData) {
      return res.status(404).json({ error: 'User profile data not found' });
    }

    res.json({
      user,
      userProfileData
    });

  } catch(err) {
    res.status(400).json({error: 'Internal Server Error'});
  }

});

module.exports = router;
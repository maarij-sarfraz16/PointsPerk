const express = require('express');
const router = express.Router();

const User = require('../../../models/User');
const UserProfileData = require('../../../models/UserProfileData');
const fetchUser = require('../../../middleware/fetchUser');

// Delete a user using POST "api/auth/user/deleteUser/delete"

router.post('/delete', fetchUser, async (req, res) => {

  const userId = req.user.id;

  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete User
    await User.findByIdAndDelete(userId);

    // Delete UserProfileData
    await UserProfileData.findOneAndDelete({ user: userId });

    res.status(200).json({ success: true, message: 'User deleted successfully!' });

  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

});

module.exports = router;
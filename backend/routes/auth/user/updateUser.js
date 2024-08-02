const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../../../models/User');
const fetchUser = require('../../../middleware/fetchUser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'points-perk';


// Update a user using POST "api/auth/user/updateUser/update"

router.post('/update', fetchUser, [
  body('contactNumber', 'Enter a valid contact number').isLength({min: 10, max: 15})
], async (req, res) => {

  const userId = req.user.id;
  const { contactNumber } = req.body;

  // Returns a bad response in case on an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.contactNumber === contactNumber) {
      return res.status(400).json({ error: 'Contact number is the same as before. No changes made.' });
    }

    user.contactNumber = contactNumber;
    await user.save();

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

});


// Update a user password using POST "api/auth/user/updateUser/updatePassword"

router.post('/updatePassword', fetchUser, [
  body('newPassword', 'Password must be at least 8 characters').isLength({ min: 8 }),
  body('confirmNewPassword', 'Confirm password is required').notEmpty()
], async (req, res) => {

  const userId = req.user.id;
  const { newPassword, confirmNewPassword } = req.body;

  // Returns a bad response in case on an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // Check if passwords match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user with new password
    user.password = hashedPassword;
    await user.save();

    // Create a new JWT token for the user
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    res.status(200).json({ success: true, authToken });

  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

});

module.exports = router;
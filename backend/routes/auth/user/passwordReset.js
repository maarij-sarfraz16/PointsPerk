const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const PasswordResetToken = require('../../../models/PasswordResetToken');
const User = require('../../../models/User');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'points-perk';


///////////  RESET PASSWORD  ///////////


// ROUTE 1: Sending reset password link through gmail using POST "/api/auth/user/passwordReset/requestReset"

router.post('/requestReset', [
  body('email', 'Enter a valid email').isEmail()
], async (req, res) => {

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check whether the provided email matches with the email of any user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Sorry, no user found" });
    }

    // Check if the password reset request is already made and the token is not expired yet
    let passwordResetToken = await PasswordResetToken.findOne({ email });
    if (passwordResetToken) {
      return res.status(400).json({ error: 'Password reset request already made. Please check your email.' });
    }

    // Generate a reset password token
    const token = crypto.randomBytes(32).toString('hex');
    passwordResetToken = new PasswordResetToken({ token, email });
    await passwordResetToken.save();

    // Send reset password email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Points Perk: Reset Your Account Password',
      text: `Hi,

We received a request to reset the password for your Points Perk account. Click the link below to reset your password:

http://localhost:8080/user/resetpassword?token=${token}

This link will expire in 1 hour. If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.

Thank you,
The Points Perk Team`
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        try {
          // Deleting token from the database in case there is an error sending email
          await PasswordResetToken.deleteOne({ email });
          // console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        } catch (deleteOneError) {
          // console.error('Error sending email', deleteOneError);
          return res.status(500).json({ error: 'Error sending email' });
        }
      }
      res.json({ message: 'Password reset link sent to email!' });
    })
    
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  } 

});


// ROUTE 2: Rendering ResetPassword page based on token validity using GET "/api/auth/user/passwordReset/verifyResetToken/:token"

router.get('/verifyResetToken/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Check if the token exists and is not expired
    const passwordResetToken = await PasswordResetToken.findOne({ token });

    if (passwordResetToken) {
      res.status(200).json({ message: 'Valid token' });
    } else {
      res.status(400).json({ error: 'Invalid or expired token' });
    }

  } catch (error) {
    // console.error(error.message);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// ROUTE 3: Updating user password using POST "/api/auth/user/passwordReset/resetPass"

router.post('/resetPass', [
  body('newPassword', 'Password must be at least 8 characters').isLength({ min: 8 }),
  body('confirmNewPassword', 'Confirm password is required').notEmpty(),
  body('token', 'Token is required').notEmpty()
], async (req, res) => {

  const { newPassword, confirmNewPassword, token } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if passwords match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Find the password reset token
    const passwordResetToken = await PasswordResetToken.findOne({ token });
    if (!passwordResetToken) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Find the user associated with the token
    const user = await User.findOne({ email: passwordResetToken.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
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

    // Delete the PasswordResetToken
    await PasswordResetToken.deleteOne({ token });

    res.json({ success: true, message: 'Password reset successfully', authToken });

  } catch (error) {
    // console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const SignupToken = require('../../../models/SignupToken');
const User = require('../../../models/User');

const crypto = require('crypto');
const nodemailer = require('nodemailer');


/////////// SIGNUP REQUEST  ///////////


// ROUTE 1: Sending signup link through gmail using POST "/api/auth/user/signup/requestSignup"

router.post('/requestSignup', [
  body('email', 'Enter a valid email').isEmail()
], async (req, res) => {

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }

    // Check if the email is already used to request signup and the token is not expired yet
    let signupToken = await SignupToken.findOne({ email });
    if (signupToken) {
      return res.status(400).json({ error: 'Signup request already made. Please check your email.' });
    }

    // Generate a signup token
    const token = crypto.randomBytes(32).toString('hex');
    signupToken = new SignupToken({ token, email });
    await signupToken.save();

    // Send the signup email
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
      subject: 'Complete Your Points Perk Registration',
      text: `Hi,

Welcome to Points Perk! To complete your registration and activate your account, please click the link below:

http://localhost:8080/auth/register?token=${token}

This link will expire in 1 hour. If you did not request to sign up for Points Perk, please ignore this email.

We look forward to having you on board!

Best regards,
The Points Perk Team`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        try {
          // Deleting token from the database in case there is an error sending email
          await SignupToken.deleteOne({ email });
          // console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        } catch (deleteOneError) {
          // console.error('Error sending email', deleteOneError);
          return res.status(500).json({ error: 'Error sending email' });
        }
      }
      res.json({ message: 'Signup link sent to email!' });
    });

  } catch (error) {
    // console.error(error.message);
    res.status(500).send('Server Error');
  }

});


// ROUTE 2: Rendering registration page based on token validity using GET "/api/auth/user/signup/verifySignupToken/:token"

router.get('/verifySignupToken/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Check if the token exists and is not expired
    const signupToken = await SignupToken.findOne({ token });

    if (signupToken) {
      res.status(200).json({ message: 'Valid token' });
    } else {
      res.status(400).json({ error: 'Invalid or expired token' });
    }

  } catch (error) {
    // console.error(error.message);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
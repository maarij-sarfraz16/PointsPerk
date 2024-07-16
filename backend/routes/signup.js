const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const SignupToken = require('../models/SignupToken');
const User = require('../models/User');

const crypto = require('crypto');
const nodemailer = require('nodemailer');


/////////// SIGNUP REQUEST  ///////////


// ROUTE 1: Sending signup link through gmail using POST "/api/signup/requestsignup"

router.post('/requestsignup', [
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
      subject: 'Points Perk Signup Link',
      text: `Click the following link to complete your signup: http://localhost:8080/api/signup/${token} \nThe link will expire in 10 minutes`
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


// ROUTE 2: Rendering registration page using GET "/api/signup/:token"

// router.get('/signup/:token', async (req, res) => {
//   const { token } = req.params;

//   try {
//     // Find the token in the database
//     const signupToken = await SignupToken.findOne({ token });
//     if (!signupToken) {
//       return res.status(400).json({ error: 'Invalid or expired token' });
//     }

//     // Render the signup form (or send back a message to the frontend to show the signup form)
//     res.json({ email: signupToken.email });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
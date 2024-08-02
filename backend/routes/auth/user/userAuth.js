const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../../../models/User');
const UserProfileData = require('../../../models/UserProfileData');
const SignupToken = require('../../../models/SignupToken');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'points-perk';


/////////// USER AUTHENTICATION ///////////


// ROUTE 1: Creating a User using POST "/api/auth/user/userAuth/createUser"

router.post('/createUser', [
  body('nameOfAgency', 'Agency name is required').notEmpty(),
  body('agencyAddress', 'Agency address is required').notEmpty(),
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('email', 'Enter a valid email').isEmail(),
  body('contactNumber', 'Enter a valid contact number').isLength({min: 10, max: 15}),
  body('password', 'Password must be at least 8 characters').isLength({min: 8}),
  body('country', 'Country is required').notEmpty(),
  body('token', 'Token is required').notEmpty()
], async (req, res) => {

  let success = false;
  const { token } = req.body;

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array()});
  }
  
  try {
    // Check whether a user with an email already exists
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({success, error: "Sorry, a user with this email already exists"});
    }

    // Check whether a user with the contact number already exists
    user = await User.findOne({contactNumber: req.body.contactNumber});
    if (user) {
      return res.status(400).json({success, error: "Sorry, a user with this contact number already exists"});
    }

    // Check if the token is valid
    const signupToken = await SignupToken.findOne({ token });
    if (!signupToken) {
      return res.status(400).json({ success, error: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      nameOfAgency: req.body.nameOfAgency,
      agencyAddress: req.body.agencyAddress,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      password: secPass,
      country: req.body.country
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;

    // Create new profile data with default values
    const profileData = new UserProfileData({
      user: user.id,
    });

    await profileData.save();

    // Delete the token after user creation
    await SignupToken.deleteOne({ token });

    res.json({success, authToken});

  } catch(err) {
    // console.log(err);
    res.status(400).json({error: 'Internal Server Error'});
  }

});


// ROUTE 2: Authenticating a User using POST "/api/auth/user/userAuth/login"

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  let success = false;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    
    success = true;
    res.json({success, authToken});

  } catch(err) {
    // console.log(err);
    res.status(400).json({error: 'Internal Server Error'});
  }

});

module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const Admin = require('../models/Admin');
const fetchAdmin = require('../middleware/fetchAdmin');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'points-perk';


/////////// USER AUTHENTICATION ///////////


// ROUTE 1: Creating a User using POST "/api/auth/createuser"
// No Login Require

router.post('/createuser', [
  body('nameOfAgency', 'Agency name is required').notEmpty(),
  body('agencyAddress', 'Agency address is required').notEmpty(),
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('email', 'Enter a valid email').isEmail(),
  body('contactNumber', 'Enter a valid contact number').isLength({min: 10, max: 15}),
  body('password', 'Password must be at least 8 characters').isLength({min: 8}),
  body('country', 'Country is required').notEmpty(),
], async (req, res) => {

  let success = false;

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array()});
  }
  
  try {
    // Check whether a user with an email already exists
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists"});
    }

    // Check whether a user with the contact number already exists
    user = await User.findOne({contactNumber: req.body.contactNumber});
    if (user) {
      return res.status(400).json({success, error: "Sorry, a user with this contact number already exists"});
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
    res.json({success, authToken});

  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

})


// ROUTE 2: Authenticating a User using POST "/api/auth/login"
// No Login Require

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
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

})


// ROUTE 3: Get loggedIn user details using POST "/api/auth/getuserdata"
// Login Require

router.post('/getuserdata', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});


/////////// ADMIN AUTHENTICATION ///////////


// ROUTE 4: Creating an Admin using POST "/api/auth/createadmin"
// No Login Require

router.post('/createadmin', [
  body('name', 'Enter a valid name'),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

  let success = false;

  // Returns a bad request in case of an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  
  try {
    // Check whether an admin with an email exists already
    let admin = await Admin.findOne({email: req.body.email});
    if (admin) {
      return res.status(400).json({success, error: "Sorry an admin with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      admin: {
        id: admin.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authToken});

  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});


// ROUTE 5: Authenticating an Admin using POST "/api/auth/adminlogin"
// No Login Require

router.post('/adminlogin', [
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
    let admin = await Admin.findOne({email});
    if (!admin) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
      return res.status(400).json({success, error: "Email or Password is incorrect"});
    }

    const data = {
      admin: {
        id: admin.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    
    success = true;
    res.json({success, authToken});

  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});


// ROUTE 6: Get loggedIn admin details using POST "/api/auth/getadmindata"
// Login Require

router.post('/getadmindata', fetchAdmin, async (req, res) => {

  try {
    adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select('-password');
    res.send(admin);
  } catch(err) {
    console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});

module.exports = router;
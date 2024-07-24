const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Admin = require('../../../models/Admin');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'points-perk';


/////////// ADMIN AUTHENTICATION ///////////


// ROUTE 1: Creating an Admin using POST "/api/auth/admin/adminAuth/createAdmin"

router.post('/createAdmin', [
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
    // console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});


// ROUTE 2: Authenticating an Admin using POST "/api/auth/admin/adminAuth/login"

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
    // console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});

module.exports = router;
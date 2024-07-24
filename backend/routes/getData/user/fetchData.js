const express = require('express');
const router = express.Router();

const User = require('../../../models/User');
const fetchUser = require('../../../middleware/fetchUser');


// ROUTE 1: Get loggedIn user details using POST "/api/fetchUserData/getdata"

router.post('/getdata', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch(err) {
    // console.log(err);
    res.status(400),json({error: 'Internal Server Error'});
  }

});

module.exports = router;
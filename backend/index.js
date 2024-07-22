const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Loading environment variables from .env file
dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userAuthRouter = require('./routes/auth/user/userAuth');
const userSignupRouter = require('./routes/auth/user/signup');
const userPasswordResetRouter = require('./routes/auth/user/passwordReset');
const fetchUserDataRouter = require('./routes/getData/user/fetchData');

const adminAuthRouter = require('./routes/auth/admin/adminAuth');
const fetchAdminDataRouter = require('./routes/getData/admin/fetchData');

// User routes
app.use('/api/auth/user', userAuthRouter);
app.use('/api/auth/user/signup', userSignupRouter);
app.use('/api/auth/user/password-reset', userPasswordResetRouter);
app.use('/api/getData/user/fetch-data', fetchUserDataRouter);

// Admin routes
app.use('/api/auth/admin', adminAuthRouter);
app.use('/api/getData/admin/fetch-data', fetchAdminDataRouter);

app.listen(port, () => {
  console.log(`Points Perk backend listening at http://localhost:${port}`)
});
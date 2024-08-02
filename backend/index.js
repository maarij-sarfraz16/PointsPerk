const connectToMongo = require("./config/dbConfig");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// User routes
const userAuthRouter = require("./routes/auth/user/userAuth");
const userSignupRouter = require("./routes/auth/user/signup");
const userPasswordResetRouter = require("./routes/auth/user/passwordReset");
const userUpdateRouter = require("./routes/auth/user/updateUser");
const userDeleteRouter = require("./routes/auth/user/deleteUser");
const userDataRouter = require("./routes/getData/user/userData");
const userProfileDataRouter = require("./routes/getData/user/userProfileData");

app.use("/api/auth/user", userAuthRouter);
app.use("/api/auth/user/signup", userSignupRouter);
app.use("/api/auth/user/password-reset", userPasswordResetRouter);
app.use("/api/auth/user/update-user", userUpdateRouter);
app.use("/api/auth/user/delete-user", userDeleteRouter);
app.use("/api/get-data/user/user-data", userDataRouter);
app.use("/api/get-data/user/user-profile-data", userProfileDataRouter);

// Admin routes
const adminAuthRouter = require("./routes/auth/admin/adminAuth");
const adminDataRouter = require("./routes/getData/admin/adminData");

app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/get-data/admin/admin-data", adminDataRouter);

app.listen(port, () => {
  console.log(`Points Perk backend listening at http://localhost:${port}`);
});

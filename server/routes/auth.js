const express = require("express");
const router = express.Router();

const User = require("../models/user");

const checkValidPhone = require("../utils/checkUser").checkValidPhone;
const checkValidName = require("../utils/checkUser").checkValidName;
const checkExistUser = require("../utils/checkUser").checkExistUser;

// @route POST api/auth/login
// @description Login a user
// @access PUBLIC
router.post("/login", async (req, res) => {
  const { phone } = req.body;
  await checkValidPhone(phone, (data) => {
    if (!data.success) {
      return res.status(400).json(data);
    }
  });

  await checkExistUser(phone, (data) => {
    if (data.success) {
      const sess = req.session;
      sess.user = data.user.toJSON();

      return res.status(200).json({
        user: data.user.toJSON(),
        success: true,
        message: "Need OTP for login success",
      });
    }
    return res.status(400).json(data);
  });
});

// @router POST api/auth/register
// @description Register a user
// @access PUBLIC
router.post("/register", async (req, res) => {
  const { phone, firstName, lastName } = req.body;
  await checkValidPhone(phone, (data) => {
    if (!data.success) {
      return res.status(400).json(data);
    }
  });

  await checkValidName(firstName, lastName, (data) => {
    if (!data.success) {
      return res.status(400).json(data);
    }
  });

  await checkExistUser(phone, (data) => {
    if (data.success) {
      return res.status(400).json(data);
    }
  });

  const newUser = new User({ phone, firstName, lastName });
  await newUser.save();

  return res.status(200).json({
    success: true,
    message: "Register Successful",
  });
});

// @route GET api/auth/dashboard
// @description show dashboard
// @access PRIVATE
router.post("/dashboard", async (req, res) => {
  const sess = req.session;
  const user = sess.user;
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Login Fail",
    });
  }
    return res.status(200).json({
      success: true,
      message: "Login sucesful",
      data: user,
    });
});

module.exports = router;

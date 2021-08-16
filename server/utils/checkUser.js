const User = require("../models/user");

module.exports.checkValidPhone = function (phone, callback) {
  if (!phone) {
    return callback({
      success: false,
      message: "Missing phone number",
    });
  }
  if (phone.length !== 10 && !isNaN(phone)) {
    return callback({
      success: false,
      message: "Invalid Phone Number",
    });
  }

  return callback({
    success: true,
    message: "Valid Phone Number",
  });
};

module.exports.checkValidName = function (firstName, lastName, callback) {
  if (!firstName || !lastName) {
    return callback({
      success: false,
      message: "Missing First or Last name",
    });
  }

  return callback({
    success: true,
    message: "Valid Phone Number",
  });
};

module.exports.checkExistUser = async function (phone, callback) {
  try {
    const user = await User.findOne({ phone });
    if (user) {
      return callback({
        user: user,
        success: true,
        message: "User Exist",
      });
    }

    return callback({
      success: false,
      message: "User Non-Exist",
    });
  } catch (error) {
    return callback({
      success: false,
      message: error.message,
    });
  }
};

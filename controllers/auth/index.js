const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const current = require("./current");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");
module.exports = {
  register,
  logout,
  login,
  current,
  updateSubscriptionUser,
  uploadAvatar,
  verifyEmail,
  resendEmail,
};

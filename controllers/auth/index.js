const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const current = require("./current");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const uploadAvatar = require("./uploadAvatar")

module.exports = {
  register,
  logout,
  login,
  current,
  updateSubscriptionUser,
  uploadAvatar,
};

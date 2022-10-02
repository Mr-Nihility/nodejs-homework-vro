const { UserModel } = require("../../models/users");

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await UserModel.findOneAndUpdate({ id: _id }, req.body, {
    new: true,
  });

  const { email, subscription } = updatedUser;

  res.json({ email, subscription });
};

module.exports = updateSubscriptionUser;

const RequestError = require("../../helpers/RequestError");
const { UserModel } = require("../../models/users");

const current = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    throw new RequestError(401);
  }
  const { email, subscription } = user;

  res.json({ email, subscription });
};

module.exports = current;

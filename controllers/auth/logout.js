const { UserModel } = require("../../models/users");
const logout = async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  await UserModel.findOneAndUpdate({ id: _id }, { token: "" }, { new: true });

  res.status(204);
};
module.exports = logout;

const { UserModel } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await UserModel.findOne({ email });

  if (!result.verify) {
    throw new RequestError(401, "Email not verify");
  }

  if (!result) {
    throw new RequestError(401, "Email is wrong");
  }

  const checkPass = await bcrypt.compare(password, result.password);

  if (!checkPass) {
    throw new RequestError(401, "Password is wrong");
  }

  const token = jwt.sign({ id: result._id }, SECRET_KEY, { expiresIn: "1h" });

  const updatedUser = await UserModel.findOneAndUpdate(
    { id: result._id },
    { token },
    { new: true }
  );

  res.json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = login;

const { UserModel } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const userEmail = await UserModel.findOne({ email });

  if (userEmail) {
    throw new RequestError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await UserModel.create({
    subscription,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({ subscription: result.subscription, email: result.email });
};

module.exports = register;

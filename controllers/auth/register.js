const { UserModel } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const userEmail = await UserModel.findOne({ email });

  if (userEmail) {
    throw new RequestError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)


  const result = await UserModel.create({
    subscription,
    email,
    password: hashedPassword,
    avatarURL,
  });

  res
    .status(201)
    .json({
      subscription: result.subscription,
      email: result.email,
      avatarURL: result.avatarURL,
    });
};

module.exports = register;

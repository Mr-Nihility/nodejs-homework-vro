const { UserModel } = require("../../models/users");
const RequestError = require("../../helpers/RequestError");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers/sendEmail");
const createVerifyEmail = require("../../helpers/createVEriFyEmail");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const userEmail = await UserModel.findOne({ email });

  if (userEmail) {
    throw new RequestError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await UserModel.create({
    subscription,
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  console.log(verificationToken);

  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    subscription: result.subscription,
    email: result.email,
    avatarURL: result.avatarURL,
  });
};

module.exports = register;

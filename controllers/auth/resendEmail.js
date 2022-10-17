const createVerifyEmail = require("../../helpers/createVEriFyEmail");
const RequestError = require("../../helpers/RequestError");
const sendEmail = require("../../helpers/sendEmail");
const { UserModel } = require("../../models/users");

const resendEmail = async (rq, rs) => {
  const { email } = rq.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not Found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);

  await sendEmail(mail);

  rs.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;

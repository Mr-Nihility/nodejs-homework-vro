const RequestError = require("../../helpers/RequestError");
const { UserModel } = require("../../models/users");

const verifyEmail = async (rq, rs) => {
  const { verificationToken } = rq.params;

  const user = await UserModel.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "Not Found");
  }

  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  rs.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;

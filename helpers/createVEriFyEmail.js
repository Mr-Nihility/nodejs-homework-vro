const { BASE_URL } = process.env;
const createVerifyEmail = (to, verificationToken) => {
  console.log(verificationToken);
  const mail = {
    to,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank"> Перейдіть для підтвердження реєстрації</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;

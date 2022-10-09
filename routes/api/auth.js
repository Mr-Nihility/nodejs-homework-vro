const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validateBody } = require("../../helpers/validateBody");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,

} = require("../../models/users");
const authenticate = require("../../helpers/middlewares/authenticate");
const upload = require("../../helpers/middlewares/upload")
const {
  register,
  logout,
  current,
  login,
  updateSubscriptionUser,
  uploadAvatar
} = require("../../controllers/auth");

router.post(
  "/users/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);

router.post("/users/login", validateBody(loginSchema), ctrlWrapper(login));

router.get("/users/current", authenticate, ctrlWrapper(current));

router.get("/users/logout", authenticate, ctrlWrapper(logout));

router.patch(
  "/users",
  authenticate,
  validateBody(subscriptionSchema),
  ctrlWrapper(updateSubscriptionUser)
);



router.patch("/users/avatars",authenticate,upload.single("avatar"),ctrlWrapper(uploadAvatar))
module.exports = router;

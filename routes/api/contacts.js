const express = require("express");
const { addSchema, updfavoriteSchema } = require("../../models/contacts");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require("../../controllers/contacts");
// const RequestError = require("../../helpers/RequestError");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validateBody } = require("../../helpers/validateBody");
const authenticate = require("../../helpers/middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(listContacts));

router.get("/:contactId", authenticate, ctrlWrapper(getContactById));

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  ctrlWrapper(addContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  authenticate,
  validateBody(addSchema),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updfavoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;

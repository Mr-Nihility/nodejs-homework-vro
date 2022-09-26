const express = require("express");
const { addSchema, updfavoriteSchema } = require("../../models/contacts");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require("../../controllers");
// const RequestError = require("../../helpers/RequestError");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validateBody } = require("../../helpers/validateBody");

const router = express.Router();

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validateBody(addSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", validateBody(addSchema), ctrlWrapper(updateContact));

router.patch(
  "/:contactId/favorite",
  validateBody(updfavoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;

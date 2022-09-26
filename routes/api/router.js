const express = require("express");
const Joi = require("joi");
const contacts = require("../../controllers");
const RequestError = require("../../helpers/RequestError");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get(
  "/",
  ctrlWrapper(contacts.listContacts)
  // async (req, res, next) => {
  //   try {
  //     const result = await contacts.listContacts();
  //     console.log(result);
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
);

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw RequestError(404);
    }

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw RequestError(404);
    }

    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
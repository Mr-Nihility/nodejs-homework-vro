const { ContactModel } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await ContactModel.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw RequestError(404);
  }

  res.json(result);
};

module.exports = removeContact;

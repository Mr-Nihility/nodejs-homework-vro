const { ContactModel } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const newContact = await ContactModel.findOneAndUpdate(
    {
      _id: contactId,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!newContact) {
    throw RequestError(404);
  }
  res.json(newContact);
};

module.exports = updateContact;

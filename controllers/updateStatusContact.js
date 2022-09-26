const { ContactModel } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const updateStatusContact = async (req, res) => {
  const { contactId: id } = req.params;

  const result = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;

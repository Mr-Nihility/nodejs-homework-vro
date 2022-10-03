const { ContactModel } = require("../../models/contacts");

const RequestError = require("../../helpers/RequestError");

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await ContactModel.findById({ _id: contactId });

  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = getContactById;

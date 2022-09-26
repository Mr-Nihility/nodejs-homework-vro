const { ContactModel } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const getContactById = async (req, res) => {
  // const getContactById = async (contactId) => {
  //   try {
  //     const contact = await ContactModel.findById({ _id: contactId });

  //     return contact;
  //   } catch (err) {
  //     return null;
  //   }
  // };

  const { contactId } = req.params;

  const result = await ContactModel.findById({ _id: contactId });

  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = getContactById;

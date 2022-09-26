const ContactModel = require("../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await ContactModel.find({});
  res.json(contacts);
};

module.exports = listContacts;

const { ContactModel } = require("../../models/contacts");
// const RequestError = require("../../helpers/RequestError");
// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts();

//   const ids = contacts.map((item) => +item.id);

//   const newContact = {
//     name,
//     email,
//     phone,
//     id: String(Math.max(...ids) + 1),
//   };

//   contacts.push(newContact);

//   await updateContacts(contacts);

//   return newContact;
// };

const addContact = async (req, res) => {
  const { _id } = req.user;

  const result = await ContactModel.create({ ...req.body, owner: _id });

  res.status(201).json(result);
};

module.exports = addContact;

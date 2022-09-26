const { ContactModel } = require("../models/contacts");
// const RequestError = require("../helpers/RequestError");
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
  // try {
  // const { error } = contactSchema.validate(req.body);
  // if (error) {
  // throw RequestError(400, "missing required name field");
  // }

  const result = await ContactModel.create(req.body);

  res.status(201).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = addContact;

// const fs = require("fs/promises");
// const path = require("path");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// const contactsPath = path.join(__dirname, "contacts.json");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

contactSchema.post("save", (error, _, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
});

const ContactModel = mongoose.model("contact", contactSchema);

const getContactById = async (contactId) => {
  try {
    const contact = await ContactModel.findById({ _id: contactId });

    return contact;
  } catch (err) {
    return null;
  }
};
const removeContact = async (contactId) => {
  try {
    const deletedContact = ContactModel.findByIdAndRemove({ _id: contactId });

    return deletedContact;
  } catch (err) {
    console.log("here", err);
    return null;
  }
};

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

// const updateContact = async (contactId, { name, email, phone }) => {
//   const contacts = await listContacts();

//   const index = contacts.findIndex(({ id }) => id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   contacts[index] = { contactId, name, email, phone };

//   await updateContacts(contacts);

//   return contacts[index];
// };

module.exports = {
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
  ContactModel,
};

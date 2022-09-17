const fs = require('fs/promises')
const path =require("path")

const contactsPath= path.join(__dirname,"contacts.json")

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
const listContacts = async () => {
  const contacts = await  fs.readFile(contactsPath,"utf8")
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const filteredContact = contacts.find(({ id }) => id === contactId);

  return filteredContact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({id})=>id===contactId);

  if(index === -1){
     return null
  }

  const [deletedContact] = contacts.splice(index,1);

  await updateContacts(contacts);

  return  deletedContact;
}

const addContact = async ({name, email, phone} ) => {
  const contacts = await listContacts();

  const ids = contacts.map((item) => +item.id);

  const newContact ={
   name, email, phone, id: String(Math.max(...ids) + 1)
  }

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();

  const index= contacts.findIndex(({id})=>id===contactId);

  if(index === -1){
    return null
  }

  contacts[index] = {contactId,name, email, phone};

  await updateContacts(contacts);

  return  contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

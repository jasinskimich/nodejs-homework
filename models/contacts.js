const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

// Returns an array of contacts read from the contacts file
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(`Error reading contacts file: ${error}`);
  }
};

// Returns the contact with the specified ID
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    console.error(`Contact with id=${contactId} not found`);
  }
  return contact;
};

// Removes the contact with the specified ID
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contactId.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    throw new Error("Contact not found");
  }
  const [contact] = contacts.splice(idx, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.error(`Error writing contacts file: ${error}`);
    throw new Error("Error removing contact");
  }
  return contact;
};

// Adds a new contact to the contacts file
const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

// Updates the contact with the specified ID
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    console.error(`Contact with id=${contactId} not found`);
  }
  const updatedContact = { ...contacts[idx], ...body, id: contactId };
  contacts.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

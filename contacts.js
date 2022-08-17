const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.normalize("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const serialisedContacts = JSON.parse(data);
      console.table(serialisedContacts);
    })
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((contacts) => {
      const preparedContacts = JSON.parse(contacts);
      const requiredContact = preparedContacts.find(
        (contact) => parseInt(contact.id) === contactId
      );
      console.table(requiredContact);
    })
    .catch((error) => console.log(error.message));
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const serialisedContacts = JSON.parse(contacts);
  try {
    const requiredContactIndex = serialisedContacts.findIndex(
      (contact) => parseInt(contact.id) === contactId
    );
    serialisedContacts.splice(requiredContactIndex, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(serialisedContacts),
      "utf-8"
    );
  } catch (error) {
    console.log(error.message);
  }
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((contacts) => {
      const serialisedContacts = JSON.parse(contacts);
      const lastId = parseInt(
        serialisedContacts[serialisedContacts.length - 1].id
      );
      const newId = String(lastId + 1);
      const newContact = {
        id: newId,
        name,
        email,
        phone,
      };
      serialisedContacts.push(newContact);
      return serialisedContacts;
    })
    .then((data) => fs.writeFile(contactsPath, JSON.stringify(data)))
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

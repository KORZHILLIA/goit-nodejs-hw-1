const contactsHandler = require("./contacts");
const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsHandler.listContacts();
      break;
    case "get":
      contactsHandler.getContactById(id);
      break;
    case "add":
      contactsHandler.addContact(name, email, phone);
      break;
    case "remove":
      contactsHandler.removeContact(id);
      break;
    default:
      console.warn("Unknown action type");
  }
}

invokeAction(argv);

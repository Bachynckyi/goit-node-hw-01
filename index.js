const contacts= require("./contacts");
const { program } = require('commander');


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const getAllContacts = await contacts.getListContacts();
            return console.table(getAllContacts);
        case "get":
            const getById = await contacts.getContactById(id);
            return console.table(getById);
        case "add":
            const newContact = await contacts.addContact({name, email, phone});
            return console.table(newContact);
        case "remove":
            const deletedContact = await contacts.removeContact(id);
            return console.table(deletedContact);
    }
};


invokeAction(argv);
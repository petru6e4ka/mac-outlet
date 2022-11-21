const fs = require("node:fs");
const { promisify } = require("node:util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const file = "./src/db/contacts.json";

const listContacts = async () => {
  return await readFileAsync(file, { encoding: "utf8" }).then((text) =>
    JSON.parse(text)
  );
};

const addContact = async (contact) => {
  let newContact;

  await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then(async (parsed) => {
      if (!Array.isArray(parsed)) {
        parsed = [];
      }
      contact.id = Math.floor(Math.random() * 100) + Date.now();
      parsed.push(contact);
      newContact = contact;

      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then(async (str) => await writeFileAsync(file, str));

  return newContact;
};

const getById = async (id) => {
  return await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => parsed.find((element) => element.id === id));
};

const updateContact = async (id, body) => {
  let updatedContact;

  await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => {
      const oldContact = parsed.find((element) => element.id === id);
      const filtered = parsed.filter((elem) => elem.id !== id);

      parsed = filtered;
      updatedContact = { ...oldContact, ...body };
      parsed.push(updatedContact);

      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then(async (str) => await writeFileAsync(file, str));

  return updatedContact;
};

const removeContact = async (id) => {
  return await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => {
      const filtered = parsed.filter((elem) => elem.id !== id);

      parsed = filtered;
      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then(async (str) => await writeFileAsync(file, str));
};

module.exports = {
  listContacts,
  addContact,
  getById,
  removeContact,
  updateContact,
};

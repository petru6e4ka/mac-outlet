const {
  listContacts,
  addContact,
  getById,
  removeContact,
  updateContact,
} = require("../models");

const getAllContacts = async (_req, res) => {
  try {
    const contacts = await listContacts();

    res.send(contacts);
  } catch (err) {
    res.status(500).end();
    return;
  }
};

const addNewContact = async (req, res) => {
  try {
    const newContact = await addContact(req.body);

    res.status(201).send(newContact);
  } catch (err) {
    res.status(500).end();
    return;
  }
};

const getOneContact = async (req, res) => {
  try {
    const contact = await getById(Number(req.params.contactId));

    if (!contact) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    res.send(contact);
  } catch (err) {
    res.status(500).end();
    return;
  }
};

const deleteOneContact = async (req, res) => {
  try {
    const contact = await getById(Number(req.params.contactId));

    if (!contact) {
      res.status(404).send({ message: "Contact not found" });
      return;
    }

    await removeContact(Number(req.params.contactId));
    res.status(200).send({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).end();
    return;
  }
};

const changeOneContact = async (req, res) => {
  try {
    const contact = await getById(Number(req.params.contactId));

    if (!contact) {
      res.status(404).send({ message: "Contact not found" });
      return;
    }

    const updated = await updateContact(Number(req.params.contactId), req.body);

    res.status(200).send(updated);
  } catch (err) {
    res.status(500).end();
    return;
  }
};

module.exports = {
  getAllContacts,
  addNewContact,
  getOneContact,
  changeOneContact,
  deleteOneContact,
};

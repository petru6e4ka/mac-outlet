const mongoose = require("mongoose");
const Contacts = require("../models/index");

const getAllContacts = async (_req, res) => {
  Contacts.find({}, (err, contacts) => {
    if (err) {
      res.status(500).end();
      return;
    }
    res.json(contacts);
  });
};

const addNewContact = async (req, res) => {
  Contacts.create(req.body, (err, contacts) => {
    if (err) {
      res.status(500).end();
      return;
    }
    res.status(201).json(contacts);
  });
};

const getOneContact = async (req, res) => {
  Contacts.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.status(500).end();
      return;
    }

    if (!contact) {
      res.status(404).send({ message: "Contact not found" });
      return;
    }

    res.json(contact);
  });
};

const deleteOneContact = async (req, res) => {
  Contacts.deleteOne({ _id: req.params.contactId }, (err, contact) => {
    if (err) {
      res.status(500).end();
      return;
    }

    if (!contact.deletedCount) {
      res.status(404).send({ message: "Contact not found" });
      return;
    }

    res.status(204).end();
  });
};

const changeOneContact = async (req, res) => {
  Contacts.findOneAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: false, useFindAndModify: true },
    (err, contact) => {
      if (err) {
        res.status(500).end();
        return;
      }

      if (!contact) {
        res.status(404).send({ message: "Contact not found" });
        return;
      }

      res.json(contact);
    }
  );
};

module.exports = {
  getAllContacts,
  addNewContact,
  getOneContact,
  changeOneContact,
  deleteOneContact,
};

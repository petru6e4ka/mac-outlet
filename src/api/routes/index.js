const {
  getAllContacts,
  addNewContact,
  getOneContact,
  changeOneContact,
  deleteOneContact,
} = require("../controllers");
const {
  keysValidation,
  valuesValidation,
  upadateFieldValidation,
} = require("../middlewares");

const routes = (app) => {
  app
    .route("/api/contacts")
    .get(getAllContacts)
    .post(keysValidation, valuesValidation, addNewContact);

  app
    .route("/api/contacts/:contactId")
    .get(getOneContact)
    .delete(deleteOneContact)
    .put(upadateFieldValidation, changeOneContact);
};

module.exports = {
  routes,
};

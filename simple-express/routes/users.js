const express = require("express");
const router = express.Router();
const contacts = require("../db/contacts.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(contacts);
});

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const contact = contacts.filter((el) => el.id === id);
  res.json(contact);
});

module.exports = router;

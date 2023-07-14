const express = require("express");
const router = express.Router();

const contacts = require("../../db/contacts.json");

router.get("/", (request, response) => {
  response.json(contacts);
});

router.get("/:id", (request, response) => {
  response.json(contacts);
});

router.post("/", (request, response) => {
  response.json(contacts);
});

router.put("/:id", (request, response) => {
  response.json(contacts);
});

router.delete("/:id", (request, response) => {
  response.json(contacts);
});

module.exports = router;

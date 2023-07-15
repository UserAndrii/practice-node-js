const { Router } = require("express");
const { createFile, getFile, getInfo } = require("../files");

const filesRouter = Router();

filesRouter.post("/", createFile);

module.exports = filesRouter;

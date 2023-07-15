const argv = require("yargs").argv;
const { createFile, getFile, getInfo } = require("./files");

function invokeAction({ action, filename, content }) {
  switch (action) {
    case "create":
      createFile(filename, content);
      break;

    case "get":
      getFile();
      break;

    case "read":
      getInfo(filename);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

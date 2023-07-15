const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (filename, content) => {
  const file = {
    filename,
    content,
  };

  const { error } = dataValidator(file);
  if (error) {
    console.log(
      chalk.red(`Please specify ${error.details[0].path[0]} paramaters`)
    );
    return;
  }

  const { result, extension } = checkExtension(filename);
  if (!result) {
    console.log(
      chalk.red(`this application doesn't support ${extension} extension`)
    );
    return;
  }

  const pathNewFile = path.join(__dirname, "files", filename);

  try {
    await fs.writeFile(pathNewFile, content, "utf-8");
    console.log(chalk.green(`File was created successfully`));
  } catch (error) {
    error.message;
  }
};

// const createFile = async (req, res, next) => {
//   try {
//     const { error } = dataValidator(req.body);

//     const { filename, content } = req.body;

//     if (error) {
//       return res.status(400).json({
//         message: `Please specify ${error.details[0].path[0]} paramaters`,
//       });
//     }

//     const { result, extension } = checkExtension(filename);
//     if (!result) {
//       return res.status(400).json({
//         message: `this application doesn't support ${extension} extension`,
//       });
//     }

//     const pathNewFile = path.join(__dirname, "files", filename);

//     await fs.writeFile(pathNewFile, content, "utf-8");

//     res.status(201).json({
//       message: `File was created successfully`,
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

const getFile = async () => {
  const readdir = await fs.readdir(path.join(__dirname, "files"));

  if (readdir.length === 0) {
    console.log(chalk.red(`Directory is EMPTY`));
    return;
  }

  console.log(readdir);
};

const getInfo = async (filename) => {
  const directory = await fs.readdir(path.join(__dirname, "files"));

  const result = directory.find((file) => file === filename);

  if (!result) {
    console.log(chalk.red(`${filename} does not exist in the directory`));
    return;
  }

  const file = await fs.readFile(
    path.join(__dirname, "files", filename),
    "utf-8"
  );

  const extension = path.extname(filename);
  const nameFile = path.basename(filename, extension);

  let fileObj = {
    name: nameFile,
    extension: extension.slice(1),
    content: result,
  };

  console.log(fileObj);
};
module.exports = { createFile, getFile, getInfo };

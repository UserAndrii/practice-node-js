const moment = require("moment");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const cors = require("cors");

const contactsRoter = require("./routes/api/contacts");

const app = express();
const patchServerLog = path.join(__dirname, "public", "server.log");

app.use(cors());

app.use("/api/contacts", contactsRoter);

app.use(async (reg, res, next) => {
  const { method, url } = reg;
  const date = moment().format("DD-MM-YYYY | hh:mm:ss");
  await fs.appendFile(patchServerLog, `\n${method} ${url} ${date}`);
  next();
});

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

/*
app.use((reg, res, next) => {
  console.log("First middleware");
  next();
});

app.use((reg, res, next) => {
  console.log("Second middleware");
  next();
});
*/

// const array = ["user.name.firstName", "Bob"];

// const convertQueryTopMap = (array) => {
//   let result = {};

//   for (let i = 0; i < array.length; i++) {
//     const keys = array[i].split(".");

//     let obj = result;

//     for (let i = 0; i < keys.length - 1; i++) {
//       const key = keys[i];

//       if (!obj[key]) {
//         obj[key] = {};
//       }

//       obj = obj[key];
//     }

//     obj[keys[keys.length - 1]] = array[i + 1];
//     i++;
//   }

//   return result;
// };

// console.log(convertQueryTopMap(array));

// { user: {
//     name: {
//       firstName: 'Bob',
//       lastName: "Smith",
//     },
//     favoritecolor: "Light%20Blue"
//   }
// }

// =======================================================================

// function createObjectFromString(str) {
//   const obj = {};
//   const parts = str.split("&");

//   for (let part of parts) {
//     const [key, value] = part.split("=");
//     // console.log("value: ", value);

//     const nestedKeys = key.split(".");
//     // console.log("nestedKeys: ", nestedKeys);

//     let nestedObj = obj;
//     console.log("nestedObj: ", nestedObj);

//     for (let i = 0; i < nestedKeys.length; i++) {
//       const nestedKey = nestedKeys[i];

//       if (i === nestedKeys.length - 1) {
//         nestedObj[nestedKey] = decodeURIComponent(value);
//       } else {
//         if (!nestedObj.hasOwnProperty(nestedKey)) {
//           nestedObj[nestedKey] = {};
//         }
//         nestedObj = nestedObj[nestedKey];
//       }
//     }
//   }

//   return obj;
// }

// const str =
//   "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue";
// const obj = createObjectFromString(str);
// console.log(obj);

// =======================================================================

// function solution(number) {
//   let sum = 0;
//   if (number <= 0) return sum;

//   for (let i = 1; i < number; i++) {
//     if (i % 3 === 0 || i % 5 === 0) {
//       sum = sum + i;
//     }
//   }

//   return sum;
// }

// console.log(solution(10));

// =======================================================================

// function findOutlier(integers) {
//   const positive = [];
//   const negative = [];

//   for (let i = 0; i < integers.length; i++) {
//     if (integers[i] % 2 === 0) {
//       positive.push(integers[i]);
//     } else {
//       negative.push(integers[i]);
//     }
//   }

//   return positive.length === 1 ? positive[0] : negative[0];
// }

// console.log(findOutlier([0, 1, 2]));

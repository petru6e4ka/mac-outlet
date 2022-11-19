const fs = require("node:fs");
const { promisify } = require("node:util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const file = "./src/db/user.json";

const get = async () => {
  return await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((data) => JSON.stringify(data.users));
};

const post = async (user) => {
  let newUser;

  await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then(async (parsed) => {
      if (!Array.isArray(parsed.users)) {
        parsed.users = [];
      }
      user.id = Math.floor(Math.random() * 100) + Date.now();
      parsed.users.push(user);
      newUser = user;

      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then((str) => {
      writeFileAsync(file, str);
    });

  return JSON.stringify(newUser);
};

const postAll = async (arr) => {
  let newUsers;

  await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then(async (parsed) => {
      if (!Array.isArray(parsed.users)) {
        parsed.users = [];
      }

      const users = arr
        .filter(
          (elem) =>
            !parsed.users.find((user) => user.username === elem.username)
        )
        .map((elem) => ({
          ...elem,
          id: Math.floor(Math.random() * 100) + Date.now(),
        }));

      newUsers = users;

      return { users: parsed.users.concat(users) };
    })
    .then((data) => JSON.stringify(data))
    .then((str) => {
      writeFileAsync(file, str);
    });

  return JSON.stringify(newUsers);
};

const getByUsername = async (username) => {
  return await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => {
      return JSON.stringify(
        parsed.users.find((element) => element.username === username)
      );
    });
};

const put = async (username, body) => {
  let updatedUser;

  await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => {
      const oldUser = parsed.users.find(
        (element) => element.username === username
      );
      const filtered = parsed.users.filter(
        (elem) => elem.username !== username
      );

      parsed.users = filtered;
      updatedUser = { ...oldUser, ...body };
      parsed.users.push(updatedUser);

      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then((str) => {
      writeFileAsync(file, str);
    });

  return JSON.stringify(updatedUser);
};

const remove = async (username) => {
  return await readFileAsync(file, { encoding: "utf8" })
    .then((text) => JSON.parse(text))
    .then((parsed) => {
      const filtered = parsed.users.filter(
        (elem) => elem.username !== username
      );

      parsed.users = filtered;
      return parsed;
    })
    .then((data) => JSON.stringify(data))
    .then((str) => {
      writeFileAsync(file, str);
    });
};

module.exports = {
  get,
  post,
  postAll,
  getByUsername,
  put,
  remove,
};

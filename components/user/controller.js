const store = require("./store");

function addUser(name) {
  if (!name) {
    console.error("[userController] No viene el name");
    return Promise.reject("Invalid Name");
  }

  const user = {
    name,
  };

  return store.add(user);
}

function getUsers(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

module.exports = {
  addUser,
  getUsers,
};

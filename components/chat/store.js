const Model = require("./model");

function addChat(chat) {
  const newChat = new Model(chat);

  return newChat.save();
}

async function list(userId) {
  let filter = {}
  if (userId) {
    filter = {
      users: userId
    }
  }

  const chats = await Model.find(filter).populate('users').then((resp) => {
    return resp
  }).catch((err) => {
    throw new Error(err)
  });
  return chats;
}

module.exports = {
  add: addChat,
  list,
};

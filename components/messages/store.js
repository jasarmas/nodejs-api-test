const Model = require("./model");

// mockup storage
const listOfMessages = [];

// mockup function
function addMessageMockup(message) {
  listOfMessages.push(message);
}

// mockup function
function getMessagesMockup() {
  return listOfMessages;
}

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(filterUser) {
  let filter = {};

  if (filterUser !== null) {
    filter = { user: filterUser };
  }

  const messages = await Model.find(filter)
    .populate("user")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return messages;
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = message;
  const newMessage = await foundMessage.save();

  return newMessage;
}

async function existMessage(id) {
  const existeMessage = await Model.exists({
    _id: id,
  });

  return existeMessage;
}

async function deleteMessage(id) {
  if (await existMessage(id)) {
    const deleteMessage = await Model.findByIdAndDelete({
      _id: id,
    });

    return deleteMessage;
  }
  return false;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  deleteMessage: deleteMessage,
  // delete
  // update
  // get
};

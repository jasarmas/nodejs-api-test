const store = require("./store");
const { socket } = require('../../socket')

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      return reject("Los datos son incorrectos");
    }

    let fileUrl = ''

    if (file) {
      fileUrl = 'http://localhost:3000/app/files/' + file.filename
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl
    };

    store.add(fullMessage);

    socket.io.emit('message', fullMessage)

    return resolve(fullMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      console.error("[messageController] No viene el ID o el Texto");
      return reject("Los datos son incorrectos");
    }

    const result = await store.updateText(id, message);

    resolve(result);
  });
}

function deleteMessage(id) {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    if (!id) {
      console.error("[messageController] No viene el ID");
      return reject("Los datos son incorrectos");
    }

    const result = await store
      .deleteMessage(id)
      .then((data) => {
        if (!data) {
          reject("Message not found");
        }
        return data;
      })
      .catch((err) => {
        reject(err);
      });

    resolve(result);
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};

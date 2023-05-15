const express = require("express");

const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.post("/", function (req, res) {
  controller
    .addChat(req.body.users)
    .then((newChat) => {
      response.success(req, res, newChat, 201);
    })
    .catch((err) => {
      response.error(req, res, "Error al crear el chat", 500);
    });
});

router.get("/:userId", function (req, res) {
  controller
    .listChats(req.params.userId)
    .then((chats) => {
      response.success(req, res, chats, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error al obtener los chats", 500);
    });
});

router.delete("/", function () {});

module.exports = router;

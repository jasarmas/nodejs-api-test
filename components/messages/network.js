const express = require("express");
const multer = require('multer')
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination : "public/file/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", function (req, res) {
  const filterMessage = req.query.user || null;
  controller
    .getMessages(filterMessage)
    .then((listOfMessages) => {
      response.success(req, res, listOfMessages);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.post("/", upload.single('file'), function (req, res) {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((e) => {
      response.error(req, res, "Error inesperado", 500, e);
    });
});

router.patch("/:id", function (req, res) {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error al hacer UPDATE del message", 500, err);
    });
});

router.delete("/:id", function (req, res) {
  controller
    .deleteMessage(req.params.id)
    .then((data) => {
      response.success(
        req,
        res,
        { message: `Mensaje ${req.params.id} eliminado`, data },
        200
      );
    })
    .catch((err) => {
      response.error(req, res, "Error al eliminar el mensaje", 500, err);
    });
});

module.exports = router;

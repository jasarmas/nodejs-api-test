const express = require("express");

const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.post("/", function (req, res) {
  controller
    .addUser(req.body.name)
    .then((resp) => {
      response.success(req, res, resp, 201);
    })
    .catch((err) => {
      response.error(req, res, "Error al crear el usuario", 500, err);
    });
});

router.get("/", function (req, res) {
  const filterUser = req.query.id || null;
  controller
    .getUsers(filterUser)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error al obtener los usuarios", 500, err);
    });
});

module.exports = router;

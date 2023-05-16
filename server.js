require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors = require('cors')
const bodyParser = require("body-parser");
const socket = require('./socket')
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_REST_OF_URI}`;
const db = require("./db");
const router = require("./network/routes");

db(uri, process.env.DB_NAME);

app.use(cors());
app.use(bodyParser.json());

socket.connect(server);

router(app);

app.use("/app", express.static("public"));

server.listen(3000, function () {
  console.log("La aplicación esta escuchando en http://localhost:3000");
});

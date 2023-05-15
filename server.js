require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_REST_OF_URI}`;

const db = require("./db");

const router = require("./network/routes");

db(uri, process.env.DB_NAME);

var app = express();

app.use(bodyParser.json());

router(app);

app.use("/app", express.static("public"));

app.listen(3000);

console.log("La aplicación esta escuchando en http://localhost:3000");

const db = require("mongoose");
db.Promise = global.Promise;

async function connect(url, dbName) {
  console.log("[db] CONECTANDO...");

  await db
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
    })
    .then(() => {
      console.log("[db] conectada con exito");
    })
    .catch((err) => {
      console.error("[db]" + err);
    });
}

module.exports = connect;

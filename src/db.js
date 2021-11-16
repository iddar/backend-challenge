const mongoose = require("mongoose");

mongoose
  .connect("mongodo://mongo/usersdb")
  .then((db) => console.log("Db is coonected to", db.connection.host))
  .catch((err) => console.log(err));

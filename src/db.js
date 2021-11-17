const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo/users")
  .then((db) => console.log("Db is coonected to", db.connection.host))
  .catch((err) => console.log(err));

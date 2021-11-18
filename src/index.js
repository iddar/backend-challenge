const express = require("express");
const { usersCollection } = require("./fetch");
const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
const userController = require('./controller/user.controller');
require("./db/setup");

app.get("/", async (req, res) => {
  res.json({
    status: "Ok!",
  });
});

app.get("/users", userController.filterUsersHandler);

app.get("/users/:id", userController.getUserById);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

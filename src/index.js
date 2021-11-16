const express = require("express");
const { usersCollection } = require("./fetch");
require("./db");
const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;

app.get("/", async (req, res) => {
  res.json({
    status: "Ok!",
  });
});

app.get("/users", async (req, res) => {
  const users = await usersCollection();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const users = await usersCollection();
  res.json(users[25]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

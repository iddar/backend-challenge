const express = require("express");
const { usersCollection } = require("./fetch");
const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
const userController = require('./controller/user.controller');
require("./db/setup");
const cron = require('node-cron');
const dataUtils = require("./db/utilsData")
app.get("/", async (req, res) => {
  res.json({
    status: "Ok!",
  });
});

app.get("/users", userController.filterUsersHandler);

app.get("/users/:id", userController.getUserById);

cron.schedule('*/45 * * * *', function() {
  console.log('...updating data base');
  dataUtils.updateData();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

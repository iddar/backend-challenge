const mongoose = require("mongoose");
const { usersCollection } = require("../fetch");
const User = require("./model/user.model");
mongoose
  .connect("mongodb://mongo/usersdb")
  .then(async (db) => {
    const users = await usersCollection();
    User.insertMany(users)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  })
  .catch((err) => console.log(err));

const mongoose = require("mongoose");
const { usersCollection } = require("../fetch");
const User = require("./model/user.model");
const dataUtils = require("./utilsData")
mongoose
  .connect("mongodb://mongo/usersdb")
  .then(async (db) => {
    console.log(dataUtils)
    dataUtils.loadDataIntoDB();
  })
  .catch((err) => console.log(err));

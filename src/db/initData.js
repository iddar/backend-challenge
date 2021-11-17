const { usersCollection } = require("../fetch");
const User = require("./model/user.model");

const startUpHandler = async () => {
  const users = await usersCollection();

  User.insertMany(users)
    .then(function () {
      console.log("Data inserted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};
startUpHandler();

const express = require("express");
const { usersCollection } = require("./fetch");

let mysql = require("mysql2");

const app = express();
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;

// middleware
// For parsing application/json - https://www.geeksforgeeks.org/express-js-req-body-property/
app.use(express.json());

let connection;

app.get("/", async (req, res) => {
  res.json({
    status: "Ok!",
  });
});

app.get("/users", async (req, res) => {
  const users = await usersCollection();

  const UserIDsTableName = `UserIDs`;

  const UserIDsColumnName = "ID";

  const CheckTableExists = `SELECT *
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = '${UserIDsTableName}'`;

  const createTableQuery = `CREATE TABLE ${UserIDsTableName};`;

  connection.query(CheckTableExists, (err, results) => {
    if (err) {
      console.log(err);
    }

    if (results.length === 0) { // if no table appears make one
      for (let i = 0; i < users.length; i++) { // go through each user and add them to the database
        if (i === 0) { // starting at the first one fince mysql needs a column name to start off with 
          connection.query(createTableQuery, (err, results) => {
            if (err) {
              console.log(err);
            }

            console.log("Users Table has been created");
          });
        }
      }
    }
  });

  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const users = await usersCollection();

  const { id } = req.params; // grab id from params

  const UserIDsTableName = `UserIDs`;

  const UserIDsColumnName = "ID";

  const CheckTableExists = `SELECT *
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = '${UserIDsTableName}'`;

  connection.query(CheckTableExists, (err, results) => {
    if (err) {
      console.log(err);
    }

    if (results.length === 0) {
      // create table and insert everyone in the table and so on and so forth then send the specific user from the table
    }

    // if table is already made users are already saved in database pull the certain user and their info from the db

    const FindSpecificUserQuery = "";

    connection.query(FindSpecificUserQuery, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    });
  });

  res.json(users[25]);
});

app.listen(port, () => {
  connection = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "password",
  });

  connection.query("USE user_service_db;");

  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

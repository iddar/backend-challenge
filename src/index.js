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
  // UserIDs (UserID int, UserInfoID int, PRIMARY KEY (UserID), FOREIGN KEY (UserInfoID) REFERENCES UserInfo (UserInfoID)),
  // UserInfo (UserInfoID int, UserID int, PRIMARY KEY (UserInfoID), FOREIGN KEY (UserID) REFERENCES UserIDs (UserID));`,
  // SELECT COUNT(*)
  //   FROM information_schema.tables
  //   WHERE table_schema = 'user_service_db'
  //   AND table_name = 'UserIDs' AND table_name = 'UserInfo';

  // https://stackoverflow.com/questions/52377469/failed-to-open-the-referenced-table this references a chiken and egg problem where both tables reference each other without being created causing circular problems

  connection.query(
    `CREATE TABLE IF NOT EXISTS UserIDs  (
      UserID int, UserInfoID int, PRIMARY KEY (UserID), FOREIGN KEY (UserInfoID) REFERENCES UserInfo (UserInfoID)
  );`,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      console.log("Users Table & UserInfo Table has been created", results);
    }
  );

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

/* 

*/

module.exports = app;

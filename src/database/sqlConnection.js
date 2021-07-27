
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password'
});

module.exports.connection = connection;


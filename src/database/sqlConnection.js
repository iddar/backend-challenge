let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "mysql",
    user: 'root',
    password: 'root'
});

connection.connect(err => {
    if (err) throw err;

    console.log("Connected");
})



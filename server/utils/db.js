import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_management_system",
});

connection.connect(function (err) {
  if (err) {
    console.log("Connection Error");
  } else {
    console.log("Connected to Database");
  }
});

export default connection;

import jwt from "jsonwebtoken";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";

export const employeeLogin = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email && !password) {
    return res.json({
      loginStatus: false,
      Error: "Please add both Email and Password",
    });
  }
  if (!email) {
    return res.json({
      loginStatus: false,
      Error: "Enter your Email",
    });
  }
  if (!password) {
    return res.json({
      loginStatus: false,
      Error: "Enter your Password",
    });
  }

  const sql = "SELECT * FROM employee WHERE email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      const hashedPassword = result[0].password; // Extract hashed password from database

      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          return res.json({ loginStatus: false, Error: "Comparison error" });
        }

        if (isMatch) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );

          res.cookie("token", token, { httpOnly: true }); // Secure cookie settings
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.json({
            loginStatus: false,
            Error: "Wrong Password",
          });
        }
      });
    } else {
      return res.json({
        loginStatus: false,
        Error: "Wrong email or password",
      });
    }
  });
};

export const employeeDetails = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const employeeLogout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
};

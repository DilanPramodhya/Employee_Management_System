import jwt from "jsonwebtoken";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

export const adminLogin = (req, res) => {
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

  const sql = "SELECT * FROM admin WHERE email = ? and password = ?";
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: "Wrong email or password",
      });
    }
  });
};

export const category = (req, res) => {
  const sql = "SELECT * FROM category";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const addCategory = (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  connection.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
};

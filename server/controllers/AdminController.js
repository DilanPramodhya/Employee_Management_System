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
export const addCategory = (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  connection.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
};

export const category = (req, res) => {
  const sql = "SELECT * FROM category";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const addEmployee = (req, res) => {
  if (!req.file) {
    return res.json({ Status: false, Error: "File upload failed" });
  }

  const sql =
    "INSERT INTO employee (name, email, password, address, salary, category_id, image) VALUES (?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing Error: ", err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.body.category_id,
      req.file.filename,
    ];

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error("SQL Error: ", err);
        return res.json({
          Status: false,
          Error: "Query Error: " + err.message,
        });
      }
      return res.json({ Status: true });
    });
  });
};

export const employee = (req, res) => {
  const sql = "SELECT * FROM employee";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const editEmployee = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sql = "SELECT * FROM employee WHERE id = ? ";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const updateEmployee = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sql = `UPDATE employee SET name= ?, email= ?, salary= ?, address= ?, category_id= ? WHERE id= ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];
  connection.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

export const deleteEmployee = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE from employee WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

export const deleteCategory = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM category WHERE id = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      if (err.code === "ER_ROW_IS_REFERENCED_2") {
        return res.json({
          Status: false,
          Error:
            "Cannot delete this category as it is referenced by other records.",
        });
      }
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }

    return res.json({ Status: true, Result: result });
  });
};
export const adminCount = (req, res) => {
  const sql = "SELECT count(id) as admin FROM admin";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const employeeCount = (req, res) => {
  const sql = "SELECT count(id) as employee FROM employee";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const salaryCount = (req, res) => {
  const sql = "SELECT sum(salary) as salaryOfEmp FROM employee";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const adminRecords = (req, res) => {
  const sql = "SELECT * FROM admin";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

export const adminLogout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
};

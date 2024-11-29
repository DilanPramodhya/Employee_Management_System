import express from "express";
import {
  addCategory,
  addEmployee,
  adminCount,
  adminLogin,
  adminLogout,
  adminRecords,
  category,
  deleteEmployee,
  editEmployee,
  employee,
  employeeCount,
  salaryCount,
  updateEmployee,
} from "../controllers/AdminController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.post("/adminLogin", adminLogin);
router.post("/addCategory", addCategory);
router.get("/category", category);
router.post("/addEmployee", upload.single("image"), addEmployee);
router.get("/employee", employee);
router.get("/editEmployee/:id", editEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.get('/adminCount', adminCount)
router.get('/employeeCount', employeeCount)
router.get('/salaryCount', salaryCount)
router.get('/adminRecords', adminRecords)
router.get('/logout', adminLogout)

export { router as adminRouter };

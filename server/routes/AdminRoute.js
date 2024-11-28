import express from "express";
import {
  addCategory,
  addEmployee,
  adminLogin,
  category,
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
export { router as adminRouter };

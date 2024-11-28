import express from "express";
import { addCategory, adminLogin, category } from "../controllers/AdminController.js";

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/addCategory", addCategory);
router.get("/category", category);

export { router as adminRouter };

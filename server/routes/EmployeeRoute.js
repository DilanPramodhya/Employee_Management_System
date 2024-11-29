import express from "express";
import {
  employeeDetails,
  employeeLogin,
  employeeLogout,
} from "../controllers/EmployeeController.js";

const router = express.Router();

router.post("/employeeLogin", employeeLogin);
router.get("/employeeDetails/:id", employeeDetails);
router.get("/logout", employeeLogout);

export { router as employeeRouter };

import { Router } from "express";
import {
  findPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers";

const router = Router();

router.get("/", findPatients);
router.post("/", createPatient);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;

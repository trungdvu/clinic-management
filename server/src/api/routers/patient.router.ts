import { Router } from "express";
import { PatientController } from "../controllers";

const router = Router();

router.get("/", PatientController.findAll);
router.post("/", PatientController.create);
router.patch("/:id", PatientController.update);
router.delete("/:id", PatientController.delete);

export default router;

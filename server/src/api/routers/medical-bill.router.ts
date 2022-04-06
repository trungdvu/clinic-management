import { Router } from "express";
import { MedicalBillController } from "../controllers";

const router = Router();

router.get("/:id", MedicalBillController.findById);
router.post("/", MedicalBillController.create);
router.patch("/:id", MedicalBillController.update);
router.delete("/:id", MedicalBillController.delete);
export default router;

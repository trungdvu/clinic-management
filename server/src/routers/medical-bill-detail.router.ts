import { Router } from "express";
import { MedicalBillDetailController } from "../controllers";

const router = Router();

router.get("/", MedicalBillDetailController.findAll);
router.post("/", MedicalBillDetailController.create);
router.patch("/:id", MedicalBillDetailController.update);
router.delete("/:id", MedicalBillDetailController.delete);

export default router;

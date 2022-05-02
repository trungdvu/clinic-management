import { Router } from "express";
import { MedicalBillController } from "../controllers";

const router = Router();

router.get("/", MedicalBillController.findAll);
router.get("/:id", MedicalBillController.findById);
router.post("/", MedicalBillController.create);
router.put("/:id", MedicalBillController.update);
router.delete("/:id", MedicalBillController.delete);

router.get(
  "/dashboard/summary-today",
  MedicalBillController.viewDashboardTodaySummary
);

export default router;

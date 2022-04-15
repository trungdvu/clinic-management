import { Router } from "express";
import { verifyUserMiddleware } from "../middlewares";
import IdentityRouter from "./identity.router";
import MedicalBillDetailRouter from "./medical-bill-detail.router";
import MedicalBillRouter from "./medical-bill.router";
import PatientRouter from "./patient.router";

const router = Router();

router.use("/identities", IdentityRouter);
router.use("/patients", verifyUserMiddleware, PatientRouter);
router.use("/medical-bills", verifyUserMiddleware, MedicalBillRouter);
router.use(
  "/medical-bill-detail",
  verifyUserMiddleware,
  MedicalBillDetailRouter
);

export default router;

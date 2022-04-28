import { Router } from "express";
import { verifyUserMiddleware } from "../middlewares";
import IdentityRouter from "./identity.router";
import MedicalBillDetailRouter from "./medical-bill-detail.router";
import MedicalBillRouter from "./medical-bill.router";
import PatientRouter from "./patient.router";
import BillPaymentRouter from "./bill-payment.router";
import DiseaseTypeRouter from "./disease-type.router";
import DrugRouter from "./drug.router";
import UnitRouter from "./unit.router";

const router = Router();

router.use("/identities", IdentityRouter);
router.use("/patients", verifyUserMiddleware, PatientRouter);
router.use("/medical-bills", verifyUserMiddleware, MedicalBillRouter);
router.use(
  "/medical-bill-detail",
  verifyUserMiddleware,
  MedicalBillDetailRouter
);
router.use("/bill-payments", verifyUserMiddleware, BillPaymentRouter);
router.use("/drugs", verifyUserMiddleware, DrugRouter);
router.use("/units", verifyUserMiddleware, UnitRouter);
router.use("/disease-types", verifyUserMiddleware, DiseaseTypeRouter);

export default router;

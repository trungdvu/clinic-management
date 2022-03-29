import IdentityRouter from "./identity.router";
import PatientRouter from "./patient.router";
import { Router } from "express";

const router = Router();

router.use("/identities", IdentityRouter);
router.use("/patients", PatientRouter);

export default router;

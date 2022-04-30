import { Router } from "express";
import { UnitController } from "../controllers";

const router = Router();

router.get("/", UnitController.findAllByDrugId);

export default router;

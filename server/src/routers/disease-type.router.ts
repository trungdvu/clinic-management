import { Router } from "express";
import { DiseaseTypeController } from "../controllers";

const router = Router();

router.get("/", DiseaseTypeController.findAll);

export default router;

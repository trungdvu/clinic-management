import { Router } from "express";
import { UsageController } from "../controllers";

const router = Router();

router.get("/", UsageController.findAll);

export default router;

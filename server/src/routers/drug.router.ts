import { Router } from "express";
import { DrugController } from "../controllers";

const router = Router();

router.get("/", DrugController.findAll);

export default router;

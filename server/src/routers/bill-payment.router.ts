import { Router } from "express";
import { BillPaymentController } from "../controllers";

const router = Router();

// router.get("/", BillPaymentController.findAll);
// router.get("/:id", BillPaymentController.findById);
router.post("/", BillPaymentController.create);
// router.put("/:id", BillPaymentController.update);
// router.delete("/:id", BillPaymentController.delete);

export default router;

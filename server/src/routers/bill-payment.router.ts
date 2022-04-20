import { Router } from "express";
import { BillPaymentController } from "../controllers";

const router = Router();

// router.get("/", BillPaymentController.findAll);
// router.get("/:id", BillPaymentController.findById);
router.post("/", BillPaymentController.create);
// router.patch("/:id", BillPaymentController.update);
// router.delete("/:id", BillPaymentController.delete);

export default router;

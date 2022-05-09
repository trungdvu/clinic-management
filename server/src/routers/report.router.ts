import { Router } from "express";
import { ReportController } from "../controllers";

const router = Router();

router.get("/monthly-revenue-report", ReportController.getMonthlyRevenueReport);
router.get("/drug-usage-report", ReportController.getDrugUsageReport);


export default router;

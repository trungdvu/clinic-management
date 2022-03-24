import IdentityRouter from "./identity.router";
import { Router } from "express";

const router = Router();

console.log("Identity router: ", IdentityRouter);

router.use("/identity", IdentityRouter);

export default router;

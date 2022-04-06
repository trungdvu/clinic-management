import { Router } from "express";
import { IdentityController } from "../controllers";

const router = Router();

router.post("/sign-in", IdentityController.signIn);

router.post("/sign-up", IdentityController.signUp);

export default router;

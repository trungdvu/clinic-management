import { Router } from "express";
import { IdentityController } from "../controllers";
import {
  signInRequestValidatorMiddleware,
  signUpRequestValidatorMiddleware,
} from "../validators";

const router = Router();

router.post(
  "/sign-in",
  signInRequestValidatorMiddleware,
  IdentityController.signIn
);

router.post(
  "/sign-up",
  signUpRequestValidatorMiddleware,
  IdentityController.signUp
);

export default router;

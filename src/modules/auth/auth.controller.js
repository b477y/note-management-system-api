import { Router } from "express";
import { AuthenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import * as AuthService from "./services/auth.service.js";
import * as Schemas from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  ValidationMiddleware(Schemas.register),
  AuthService.register
);
router.post("/login", ValidationMiddleware(Schemas.login), AuthService.login);
router.post(
  "/forget-password",
  ValidationMiddleware(Schemas.forgetPassword),
  AuthService.forgetPassword
);
router.post(
  "/reset-password",
  ValidationMiddleware(Schemas.resetPassword),
  AuthService.resetPassword
);
router.post(
  "/logout",
  ValidationMiddleware(Schemas.logout),
  AuthenticationMiddleware(),
  AuthService.logout
);

export default router;

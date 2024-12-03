import { Router, json } from "express";
import { checkSchema } from "express-validator";
import AuthValidator from "../validators/auth.validator";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post(
  "/singup/:role",
  checkSchema(AuthValidator.signupVaildator),
  AuthController.signup
);

authRoutes.get(
  "/signin/:role",
  checkSchema(AuthValidator.signinValidator),
  AuthController.signin
);
authRoutes.get("/logout", AuthController.logout);
export default authRoutes;

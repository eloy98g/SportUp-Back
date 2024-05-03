import { Router } from "express";
import { AuthController } from "../controllers/auth/authController";

export const authRouter = Router();

authRouter.post("/signup", AuthController.newUser);

authRouter.post("/signin", AuthController.signIn);

authRouter.post("/forgotPassword", AuthController.forgotPassword);

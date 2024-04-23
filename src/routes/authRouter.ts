import { Router } from "express";
import { AuthController } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/signup", AuthController.newUser);

authRouter.post("/signin", AuthController.signin);

authRouter.post("/forgotPassword", AuthController.forgotPassword);

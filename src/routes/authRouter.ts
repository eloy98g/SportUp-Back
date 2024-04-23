import { Router } from "express";
import { AuthController } from "../controllers/authController.ts";

export const authRouter = Router();

authRouter.get("/signup", AuthController.newUser);

authRouter.post("/signin", AuthController.signin);

authRouter.post("/forgotPassword", AuthController.forgotPassword);

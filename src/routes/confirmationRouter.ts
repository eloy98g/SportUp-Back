import { Router } from "express";
import { ConfirmationController } from "../controllers/confirmation/confirmationController";

export const confirmationRouter = Router();

confirmationRouter.get("/", ConfirmationController.getAll);

confirmationRouter.post("/", ConfirmationController.create);
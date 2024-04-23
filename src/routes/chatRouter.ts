import { Router } from "express";
import { ChatController } from "../controllers/chatController";

export const chatRouter = Router();

chatRouter.get("/", ChatController.getAll);

chatRouter.get("/:id", ChatController.getById);
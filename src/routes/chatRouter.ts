import { Router } from "express";
import { ChatController } from "../controllers/chat/chatController";

export const chatRouter = Router();

chatRouter.get("/", ChatController.getAllOfUser);

chatRouter.get("/:id", ChatController.getMessages);

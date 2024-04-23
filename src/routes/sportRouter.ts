import { Router } from "express";
import { SportController } from "../controllers/sportController";

export const sportRouter = Router();

sportRouter.post("/:id/favorite", SportController.favorite);

sportRouter.post("/:id/unfavorite", SportController.unfavorite);

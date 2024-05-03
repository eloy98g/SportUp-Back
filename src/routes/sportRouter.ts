import { Router } from "express";
import { SportController } from "../controllers/sport/sportController";

export const sportRouter = Router();

sportRouter.get("/", SportController.getAll);

sportRouter.post("/:id/favorite", SportController.favorite);

sportRouter.post("/:id/unfavorite", SportController.unfavorite);

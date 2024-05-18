import { Router } from "express";
import { ReviewController } from "../controllers/review/reviewController";

export const reviewRouter = Router();

reviewRouter.post("/", ReviewController.create);

reviewRouter.get("/", ReviewController.getAll);

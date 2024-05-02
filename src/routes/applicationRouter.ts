import { Router } from "express";
import { ApplicationController } from "../controllers/application";

export const applicationRouter = Router();

applicationRouter.get("/:id", ApplicationController.getAll);

applicationRouter.post("/", ApplicationController.create);

applicationRouter.post("/:id/resolve", ApplicationController.resolve);
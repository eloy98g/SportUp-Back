import { Router } from "express";
import { ActivityController } from "../controllers/activity";

export const activityRouter = Router();

activityRouter.get("/:id", ActivityController.getById);

activityRouter.get("/", ActivityController.getAll);

activityRouter.post("/", ActivityController.create);

activityRouter.patch("/:id", ActivityController.update);

activityRouter.delete("/:id", ActivityController.delete);

activityRouter.patch("/:id/teams", ActivityController.updateTeams);

activityRouter.delete("/:id/players", ActivityController.removePlayers);

activityRouter.post("/:id/result", ActivityController.createResult);
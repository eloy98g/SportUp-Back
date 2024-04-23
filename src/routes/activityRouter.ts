import { Router } from "express";
import { ActivityController } from "../controllers/activityController";

export const activityRouter = Router();

activityRouter.get("/:id", ActivityController.getById);

activityRouter.get("/", ActivityController.getAll);

activityRouter.post("/", ActivityController.create);

activityRouter.patch("/:id", ActivityController.update);

activityRouter.delete(":id/", ActivityController.delete);

activityRouter.post("/:id/result", ActivityController.createResult);

activityRouter.post("/:id/participation", ActivityController.createParticipation);

activityRouter.get("/:id/participation", ActivityController.getAllParticipation);

activityRouter.patch("/:id/resolve-participation/:id", ActivityController.resolveParticipation);

import { Router } from "express";
import { UserController } from "../controllers/user/userController";

export const userRouter = Router();

userRouter.get("/:id", UserController.getById);

userRouter.get("/", UserController.getAll);

userRouter.get("/:id/favSports", UserController.getFavoriteSports);

userRouter.patch("/:id", UserController.update);

userRouter.post("/:id/follow", UserController.follow);

userRouter.post("/:id/unfollow", UserController.unfollow);

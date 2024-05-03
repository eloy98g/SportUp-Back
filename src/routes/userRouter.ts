import { Router } from "express";
import { UserController } from "../controllers/user/userController";

export const userRouter = Router();

userRouter.get("/:id", UserController.getById);

userRouter.get("/", UserController.getAll);

userRouter.patch("/:id", UserController.update);

userRouter.post("/user/:id/follow", UserController.follow);

userRouter.post("/user/:id/unfollow", UserController.unfollow);

import { Request, Response } from "express";
import { UserModel } from "../models/sqlite/user";

export class UserController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: "Movie not found" });
  }

  static async getAll(_req: Request, _res: Response) {}

  static async update(_req: Request, _res: Response) {}

  static async follow(_req: Request, _res: Response) {}

  static async unfollow(_req: Request, _res: Response) {}
}

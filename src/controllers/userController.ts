import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { ResponseHandler } from "../utils/responseHandler";

export class UserController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });

    if (user) {
      return ResponseHandler.handleSuccess(res, user);
    }
    return ResponseHandler.handleNotFound(res, "Usuario no encontrado.");
  }

  static async getAll(_req: Request, _res: Response) {}

  static async update(_req: Request, _res: Response) {}

  static async follow(_req: Request, _res: Response) {}

  static async unfollow(_req: Request, _res: Response) {}

}

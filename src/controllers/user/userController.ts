import { Request, Response } from "express";
import { getById } from "./methods/getById";
import { update } from "./methods/update";

export class UserController {
  static getById = async (req: Request, res: Response) => getById(req, res);
  
  static update = async (req: Request, res: Response) => update(req, res);

  static async getAll(_req: Request, _res: Response) {}

  static async follow(_req: Request, _res: Response) {}

  static async unfollow(_req: Request, _res: Response) {}

}

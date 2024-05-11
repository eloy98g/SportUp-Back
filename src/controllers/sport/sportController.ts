import { Request, Response } from "express";
import { getAll } from "./methods/getAll";
import { favorite } from "./methods/favorite";
import { unfavorite } from "./methods/unfavorite";

export class SportController {
  static getAll = async (_req: Request, res: Response) => getAll(_req, res);

  static favorite = async (req: Request, res: Response) => favorite(req, res);

  static unfavorite = async (req: Request, res: Response) =>
    unfavorite(req, res);
}

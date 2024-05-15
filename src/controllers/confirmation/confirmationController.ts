import { Request, Response } from "express";

import { create } from "./methods/create";
import { getAll } from "./methods/getAll";

export class ConfirmationController {
  static create = async (req: Request, res: Response) => create(req, res);

  static getAll = async (req: Request, res: Response) => getAll(req, res);
}

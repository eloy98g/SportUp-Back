import { Request, Response } from "express";

import { create } from "./methods/create";
import { getAll } from "./methods/getAll";
import { resolve } from "./methods/resolve";

export class ApplicationController {
  static create = async (req: Request, res: Response) => create(req, res);

  static getAll = async (req: Request, res: Response) => getAll(req, res);

  static resolve = async (req: Request, res: Response) => resolve(req, res);
}
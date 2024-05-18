import { Request, Response } from "express";
import { create } from "./methods/create";

export class ReviewController {
  static create = async (req: Request, res: Response) => create(req, res);
}

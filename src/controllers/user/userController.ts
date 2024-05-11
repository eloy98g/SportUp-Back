import { Request, Response } from "express";
import { getById } from "./methods/getById";
import { update } from "./methods/update";
import { getAll } from "./methods/getAll";
import { follow } from "./methods/follow";
import { unfollow } from "./methods/unfollow";

export class UserController {
  static getById = async (req: Request, res: Response) => getById(req, res);

  static update = async (req: Request, res: Response) => update(req, res);

  static getAll = async (req: Request, res: Response) => getAll(req, res);

  static follow = async (req: Request, res: Response) => follow(req, res);

  static unfollow = async (req: Request, res: Response) => unfollow(req, res);
}

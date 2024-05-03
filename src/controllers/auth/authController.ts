import { Request, Response } from "express";

import { newUser } from "./methods/newUser";
import { signIn } from "./methods/signIn";

export class AuthController {
  static newUser = async (req: Request, res: Response) => newUser(req, res);

  static signIn = async (req: Request, res: Response) => signIn(req, res);

  static async forgotPassword(_req: Request, _res: Response) {}
}

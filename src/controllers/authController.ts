import { Request, Response } from "express";
import { createHash } from "crypto";
import { validateCredentials } from "../schemas/auth";
import { AuthModel } from "../models/sqlite/auth";
import { ResponseHandler } from "../utils/responseHandler";
import NewUser from "../types/auth/NewUser";

export class AuthController {
  static async newUser(req: Request, res: Response) {
    const result = validateCredentials(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    const passwordHash = createHash("md5")
      .update(result.data.password)
      .digest("hex");

    const input: NewUser = {
      email: result.data.email,
      password: passwordHash,
      creationDate: Date.now() / 1000,
      phoneVerified: false,
      emailVerified: false,
      gender: "NS/NC",
    };

    const user = await AuthModel.newUser(input);

    if (user) {
      return ResponseHandler.handleSuccess(res, user);
    } else if (user === false) {
      return ResponseHandler.handleNotFound(res, "User already exists.");
    } else {
      return ResponseHandler.handleNotFound(res, "Error creating user.");
    }
  }

  static async signin(_req: Request, _res: Response) {}

  static async forgotPassword(_req: Request, _res: Response) {}
}

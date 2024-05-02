import { Request, Response } from "express";
import { validateCredentials } from "../schemas/auth";
import { AuthModel } from "../models/auth";
import { ResponseHandler } from "../utils/responseHandler";
import NewUser from "../types/auth/NewUser";
import Credential from "../types/auth/Credential";
import getPasswordHash from "../utils/getPasswordHash";
import getParsedValidationError from "../utils/getParsedValidationError";

export class AuthController {
  static async newUser(req: Request, res: Response) {
    const result = validateCredentials(req.body);

    console.log("result", result);
    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const input: NewUser = {
      email: result.data.email,
      password: getPasswordHash(result.data.password),
      creationDate: Math.floor(Date.now() / 1000),
      phoneVerified: false,
      emailVerified: false,
      gender: "NS/NC",
    };

    const user = await AuthModel.newUser(input);

    if (user) {
      return ResponseHandler.handleSuccess(res, user);
    } else if (user === false) {
      return ResponseHandler.handleNotFound(res, "El usuario ya existe.");
    } else {
      return ResponseHandler.handleNotFound(res, "Error creando el usuario.");
    }
  }

  static async signin(req: Request, res: Response) {
    const input: Credential = {
      email: req.body.email || "",
      password: getPasswordHash(req.body.password) || "",
    };

    const user = await AuthModel.signin(input);

    if (user) {
      return ResponseHandler.handleSuccess(res, user);
    } else {
      return ResponseHandler.handleNotFound(res, "Email o contraseña incorrectos.");
    }
  }

  static async forgotPassword(_req: Request, _res: Response) {}
}

import { Request, Response } from "express";

// Models
import { AuthModel } from "../../../models/auth/authModel";

// Schemas
import { validateCredentials } from "../../../schemas/auth";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function newUser(req: Request, res: Response) {
  const result = validateCredentials(req.body);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const user = await AuthModel.newUser(result.data);

  if (user.result === true) {
    return ResponseHandler.handleSuccess(res, user.data);
  } else {
    return ResponseHandler.handleNotFound(res, user?.message);
  }
}

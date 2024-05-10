import { Request, Response } from "express";

// Models
import { UserModel } from "../../../models/user/userModel";

// Schemas
import { validateAllUser } from "../../../schemas/user";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function getAll(req: Request, res: Response) {
  const result = validateAllUser(req.body);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const user = await UserModel.getAll(result.data);

  if (user.result) {
    return ResponseHandler.handleSuccess(res, user.data);
  }
  return ResponseHandler.handleNotFound(res, user.message);
}

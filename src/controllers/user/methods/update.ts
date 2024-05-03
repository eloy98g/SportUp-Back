import { Request, Response } from "express";

// Models
import { UserModel } from "../../../models/user/userModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const gidResult = validateGid(id);

  if (!gidResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(gidResult.error.errors)
    );
  }

  const user = await UserModel.update(id, null);

  if (user) {
    return ResponseHandler.handleSuccess(res, user);
  }
  return ResponseHandler.handleNotFound(res, "Usuario no encontrado.");
}

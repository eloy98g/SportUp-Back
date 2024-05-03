import { Request, Response } from "express";

// Models
import { UserModel } from "../../../models/user/userModel";

// Schemas
import { validateUser } from "../../../schemas/user";
import { validateGid } from "../../../schemas/common";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const gidResult = validateGid(id);
  const result = validateUser(req.body);

  if (!gidResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(gidResult.error.errors)
    );
  }

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const user = await UserModel.update(id, result.data);

  if (user.result) {
    return ResponseHandler.handleSuccess(res, user.data);
  }else{

    return ResponseHandler.handleNotFound(res, user.message);
  }
}

import { Request, Response } from "express";

// Models
import { UserModel } from "../../../models/user/userModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function follow(req: Request, res: Response) {
  const { id: userGid } = req.params;
  const { gid: friendGid } = req.body;
  const userResult = validateGid(userGid);
  const friendResult = validateGid(friendGid);

  if (!userResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(userResult.error.errors)
    );
  }
  if (!friendResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(friendResult.error.errors)
    );
  }

  console.log(userResult.data, friendResult.data)

  const user = await UserModel.follow(userResult.data, friendResult.data);

  if (user.result) {
    return ResponseHandler.handleSuccess(res, user.data);
  }
  return ResponseHandler.handleNotFound(res, user.message);
}

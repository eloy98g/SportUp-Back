import { Request, Response } from "express";

// Models
import { SportModel } from "../../../models/sport/sportModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function unfavorite(req: Request, res: Response) {
  const { id: sportGid } = req.params;
  const { gid: userGid } = req.body;
  const userResult = validateGid(userGid);
  const sportResult = validateGid(sportGid);

  if (!userResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(userResult.error.errors)
    );
  }
  if (!sportResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(sportResult.error.errors)
    );
  }

  const user = await SportModel.unfavorite(sportResult.data, userResult.data);

  if (user.result) {
    return ResponseHandler.handleSuccess(res, user.data);
  }
  return ResponseHandler.handleNotFound(res, user.message);
}

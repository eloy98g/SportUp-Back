import { Request, Response } from "express";

// Models
import { ConfirmationModel } from "../../../models/confirmation/confirmationModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getAll(req: Request, res: Response) {
  const { userGid, activityGid } = req.query;
  const userResult = validateGid(userGid);
  const activityResult = validateGid(activityGid);

  let input: any = {};

  if (!userResult.success && !activityResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(
        userResult.error.errors || activityResult.error.errors
      )
    );
  }

  if (userResult.success) {
    input.userGid = userResult.data;
  }

  if (activityResult.success) {
    input.activityGid = activityResult.data;
  }

  const result = await ConfirmationModel.getAll(input);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(res, result.message);
}

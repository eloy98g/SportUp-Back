import { Request, Response } from "express";

// Models
import { ConfirmationModel } from "../../../models/confirmation/confirmationModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";
import { ActivityModel } from "../../../models/activity/activityModel";

export async function create(req: Request, res: Response) {
  const { userGid, activityGid } = req.body;
  const userResult = validateGid(userGid);
  const activityResult = validateGid(activityGid);

  if (!userResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(userResult.error.errors)
    );
  }

  if (!activityResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(activityResult.error.errors)
    );
  }

  const input = {
    userGid: userResult.data,
    activityGid: activityResult.data,
  };

  const result = await ConfirmationModel.create(input);

  if (result.result) {
    const activity = await ActivityModel.getById(activityResult.data);
    return ResponseHandler.handleSuccess(res, activity);
  }
  return ResponseHandler.handleNotFound(res, result.message);
}

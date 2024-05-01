import { Request, Response } from "express";

// Models
import { ActivityModel } from "../../../models/activity";

// Schemas
import { validateActivityParameters } from "../../../schemas/activity";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getAll(req: Request, res: Response) {
  const result = validateActivityParameters(req.query);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const activityArray = await ActivityModel.getAll(result.data);

  if (activityArray) {
    return ResponseHandler.handleSuccess(res, activityArray);
  }
  return ResponseHandler.handleNotFound(res, "Error fetching activities.");
}

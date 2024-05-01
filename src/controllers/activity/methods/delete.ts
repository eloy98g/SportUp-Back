import { Request, Response } from "express";

// Models
import { ActivityModel } from "../../../models/activity";

// Schemas
import { validateActivityGid } from "../../../schemas/activity";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function deleteActivity(req: Request, res: Response) {
  const { id } = req.params;
  const result = validateActivityGid(id);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const activity = await ActivityModel.delete(result.data);

  if (activity) {
    return ResponseHandler.handleSuccess(res, activity);
  }
  return ResponseHandler.handleNotFound(res, "Error deleting activity.");
}
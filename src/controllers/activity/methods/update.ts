import { Request, Response } from "express";

// Models
import { ActivityModel } from "../../../models/activity";

// Schemas
import { validateEditActivity } from "../../../schemas/activity";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function update(req: Request, res: Response) {
  const result = validateEditActivity(req.body);
  const { id } = req.params;
  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const activity = await ActivityModel.update(id, result.data);

  if (activity) {
    return ResponseHandler.handleSuccess(res, activity);
  }
  return ResponseHandler.handleNotFound(res, "Error updating activity.");
}

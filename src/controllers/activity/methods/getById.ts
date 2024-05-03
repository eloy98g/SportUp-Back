import { Request, Response } from "express";

// Models
import { ActivityModel } from "../../../models/activity/activityModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const result = validateGid(id);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const activity = await ActivityModel.getById(result.data);

  if (activity) {
    return ResponseHandler.handleSuccess(res, activity);
  }
  return ResponseHandler.handleNotFound(res, "Error obteniendo los datos de la actividad.");
}

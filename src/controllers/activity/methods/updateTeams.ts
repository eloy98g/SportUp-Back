import { Request, Response } from "express";

// Models
import { ActivityModel } from "../../../models/activity";

// Schemas
import { validateTeamRelation } from "../../../schemas/teamPlayerRelation";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function updateTeams(req: Request, res: Response) {
  const result = validateTeamRelation(req.body);
  const { id } = req.params;
  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const activity = await ActivityModel.updateTeams(id, result.data);

  if (activity) {
    return ResponseHandler.handleSuccess(res, activity);
  }
  return ResponseHandler.handleNotFound(res, "Error updating activity.");
}

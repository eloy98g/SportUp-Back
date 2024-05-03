import { Request, Response } from "express";

import { validateScoreArray } from "../../../schemas/activity/validateScore";
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";
import { ActivityModel } from "../../../models/activity/activityModel";
import { validateGid } from "../../../schemas/common";

export async function createResult(req: Request, res: Response) {
  const { id } = req.params;
  const gidResult = validateGid(id);
  const result = validateScoreArray(req.body);

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

  const response = await ActivityModel.createResult(
    gidResult.data,
    result.data
  );

  if (response.result) {
    return ResponseHandler.handleSuccess(res, response.data);
  }
  return ResponseHandler.handleNotFound(res, response.message);
}

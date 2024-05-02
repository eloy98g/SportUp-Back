import { Request, Response } from "express";

// Models
import { ApplicationModel } from "../../../models/application";

// Schemas
import { validateApplication } from "../../../schemas/application";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function create(req: Request, res: Response) {
  const result = validateApplication(req.query);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  const applicationArray = await ApplicationModel.getAll(result.data);

  if (applicationArray) {
    return ResponseHandler.handleSuccess(res, applicationArray);
  }
  return ResponseHandler.handleNotFound(res, "Error fetching activities.");
}

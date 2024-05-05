import { Request, Response } from "express";

// Models
import { ApplicationModel } from "../../../models/application";

// Schemas
import { validateApplication } from "../../../schemas/application";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function create(req: Request, res: Response) {
  const validationResult = validateApplication(req.body);

  if (!validationResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(validationResult.error.errors)
    );
  }

  const result = await ApplicationModel.create(validationResult.data);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(
    res,
    result.message || "Error creando la solicitud."
  );
}

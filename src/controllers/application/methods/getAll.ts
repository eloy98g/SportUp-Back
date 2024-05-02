import { Request, Response } from "express";

// Models
import { ApplicationModel } from "../../../models/application";

// Schemas
import { validateGid } from "../../../schemas/application";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getAll(req: Request, res: Response) {
  const { id } = req.params;
  const result = validateGid(id);

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
  return ResponseHandler.handleNotFound(res, "Error obteniendo las solicitudes.");
}

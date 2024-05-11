import { Request, Response } from "express";

// Models
import { ApplicationModel } from "../../../models/application";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";
import { validateApplicationBody } from "../../../schemas/application";

export async function getAll(req: Request, res: Response) {
  const { id } = req.params;
  const gidResult = validateGid(id);
  const result = validateApplicationBody(req.query);

  if (!result.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(result.error.errors)
    );
  }

  if (!gidResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(gidResult.error.errors)
    );
  }

  const applicationArray = await ApplicationModel.getAll(
    gidResult.data,
    result.data
  );

  if (applicationArray) {
    return ResponseHandler.handleSuccess(res, applicationArray);
  }
  return ResponseHandler.handleNotFound(
    res,
    "Error obteniendo las solicitudes."
  );
}

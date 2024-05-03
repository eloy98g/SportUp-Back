import { Request, Response } from "express";

// Models
import { ApplicationModel } from "../../../models/application";

// Schemas
import {
  validateApplicationResponse,
} from "../../../schemas/application";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";
import { validateGid } from "../../../schemas/common";

export async function resolve(req: Request, res: Response) {
  const result = validateApplicationResponse(req.body);
  const { id } = req.params;
  const gidResult = validateGid(id);

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

  const input = {
    gid: id,
    response: result.data.response,
  };

  const responseResult = await ApplicationModel.resolve(input);

  if (responseResult.result) {
    return ResponseHandler.handleSuccess(res, responseResult.result);
  }
  return ResponseHandler.handleNotFound(
    res,
    responseResult.message || "Error modificando la solicitud."
  );
}

import { Request, Response } from "express";

// Models
import { ReportModel } from "../../../models/report/reportModel";

// Schemas
import { validateReport } from "../../../schemas/report";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function createReport(req: Request, res: Response) {
  const validationResult = validateReport(req.body);

  if (!validationResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(validationResult.error.errors)
    );
  }

  const result = await ReportModel.createReport(validationResult.data);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(
    res,
    result.message || "Error creando la solicitud."
  );
}

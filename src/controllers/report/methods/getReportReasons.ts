import { Request, Response } from "express";

// Models
import { ReportModel } from "../../../models/report/reportModel";

// Schemas

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getReportReasons(_req: Request, res: Response) {
  const result = await ReportModel.getReportReasons();

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(
    res,
    result.message || "Error creando la solicitud."
  );
}

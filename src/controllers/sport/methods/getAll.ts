import { Request, Response } from "express";

// Models
import { SportModel } from "../../../models/sport/sportModel";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getAll(_req: Request, res: Response) {
  const sportsArray = await SportModel.getAll();

  if (sportsArray) {
    return ResponseHandler.handleSuccess(res, sportsArray);
  }
  return ResponseHandler.handleNotFound(res, "Error obteniendo los deportes.");
}

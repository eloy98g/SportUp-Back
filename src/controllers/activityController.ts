import { Request, Response } from "express";
import { validateActivityParameters } from "../schemas/activity";
import { ResponseHandler } from "../utils/responseHandler";
import getParsedValidationError from "../utils/getParsedValidationError";
import { ActivityModel } from "../models/activity";

export class ActivityController {
  static async getAll(req: Request, res: Response) {
    const result = validateActivityParameters(req.query);

    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const activityArray = await ActivityModel.getAll(result.data);

    if (activityArray) {
      return ResponseHandler.handleSuccess(res, activityArray);
    }
    return ResponseHandler.handleNotFound(res, "Error fetching activities.");
  }

  static async getById(_req: Request, _res: Response) {}

  static async create(_req: Request, _res: Response) {}

  static async update(_req: Request, _res: Response) {}

  static async delete(_req: Request, _res: Response) {}

  static async createResult(_req: Request, _res: Response) {}

  static async createParticipation(_req: Request, _res: Response) {}

  static async getAllParticipation(_req: Request, _res: Response) {}

  static async resolveParticipation(_req: Request, _res: Response) {}
}

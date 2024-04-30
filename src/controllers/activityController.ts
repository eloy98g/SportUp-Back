import { Request, Response } from "express";
import {
  validateActivityGid,
  validateActivityParameters,
} from "../schemas/activity";
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

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = validateActivityGid(id);
    console.log('getById',id)
    console.log('result,',result)

    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const activity = await ActivityModel.getById(result.data);

    if (activity) {
      return ResponseHandler.handleSuccess(res, activity);
    }
    return ResponseHandler.handleNotFound(res, "Error fetching activity.");
  }

  static async create(_req: Request, _res: Response) {}

  static async update(_req: Request, _res: Response) {}

  static async delete(_req: Request, _res: Response) {}

  static async createResult(_req: Request, _res: Response) {}

  static async createParticipation(_req: Request, _res: Response) {}

  static async getAllParticipation(_req: Request, _res: Response) {}

  static async resolveParticipation(_req: Request, _res: Response) {}
}

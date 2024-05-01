import { Request, Response } from "express";
import {
  validateActivity,
  validateActivityGid,
  validateActivityParameters,
  validateEditActivity,
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

  static async create(req: Request, res: Response) {
    const result = validateActivity(req.body);

    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const activity = await ActivityModel.create(result.data);

    if (activity) {
      return ResponseHandler.handleSuccess(res, activity);
    }
    return ResponseHandler.handleNotFound(res, "Error creating activity.");
  }

  static async update(req: Request, res: Response) {
    const result = validateEditActivity(req.body);
    const { id } = req.params;
    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const activity = await ActivityModel.update(id, result.data);

    if (activity) {
      return ResponseHandler.handleSuccess(res, activity);
    }
    return ResponseHandler.handleNotFound(res, "Error creating activity.");
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = validateActivityGid(id);

    if (!result.success) {
      return ResponseHandler.handleNotFound(
        res,
        getParsedValidationError(result.error.errors)
      );
    }

    const activity = await ActivityModel.delete(result.data);

    if (activity) {
      return ResponseHandler.handleSuccess(res, activity);
    }
    return ResponseHandler.handleNotFound(res, "Error deleting activity.");
  }

  static async createResult(_req: Request, _res: Response) {}

  static async createParticipation(_req: Request, _res: Response) {}

  static async getAllParticipation(_req: Request, _res: Response) {}

  static async resolveParticipation(_req: Request, _res: Response) {}
}

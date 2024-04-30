import { Request, Response } from 'express';
import { SportModel } from '../models/sport';
import { ResponseHandler } from '../utils/responseHandler';

export class SportController {
  static async getAll(_req:Request, res:Response) {
    const sportsArray = await SportModel.getAll();

    if (sportsArray) {
      return ResponseHandler.handleSuccess(res, sportsArray);
    }
    return ResponseHandler.handleNotFound(res, "Error fetching activities.");
  }

  static async favorite(_req:Request, _res:Response) {}

  static async unfavorite(_req:Request, _res:Response) {}
}
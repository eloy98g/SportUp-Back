import { Request, Response } from 'express';
import { getAll } from './methods/getAll';

export class SportController {
  static getAll = async (_req:Request, res:Response)=> getAll(_req, res);

  static async favorite(_req:Request, _res:Response) {}

  static async unfavorite(_req:Request, _res:Response) {}
}
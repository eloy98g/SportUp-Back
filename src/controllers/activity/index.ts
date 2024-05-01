import { Request, Response } from "express";

// Methods
import { getAll } from "./methods/getAll";
import { getById } from "./methods/getById";
import { create } from "./methods/create";
import { update } from "./methods/update";
import { deleteActivity } from "./methods/delete";
import { updateTeams } from "./methods/updateTeams";

export class ActivityController {
  static getAll = async (req: Request, res: Response) => getAll(req, res);

  static getById = async (req: Request, res: Response) => getById(req, res);

  static create = async (req: Request, res: Response) => create(req, res);

  static update = async (req: Request, res: Response) => update(req, res);

  static delete = async (req: Request, res: Response) =>
    deleteActivity(req, res);

  static updateTeams = async (req: Request, res: Response) =>
    updateTeams(req, res);

  // static createResult = async (req: Request, res: Response) =>
  //   createResult(req, res);

  // static createParticipation = async (req: Request, res: Response) =>
  //   createParticipation(req, res);

  // static getAllParticipation = async (req: Request, res: Response) =>
  //   getAllParticipation(req, res);

  // static resolveParticipation = async (req: Request, res: Response) =>
  //   resolveParticipation(req, res);
}

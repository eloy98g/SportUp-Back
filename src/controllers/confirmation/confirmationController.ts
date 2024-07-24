import { Request, Response } from "express";

import { create } from "./methods/create";
import { getAll } from "./methods/getAll";

export class ConfirmationController {
	static getAll = async (req: Request, res: Response) => getAll(req, res);

	static create = async (req: Request, res: Response) => create(req, res);
}

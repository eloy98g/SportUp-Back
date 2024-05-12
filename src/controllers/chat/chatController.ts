import { Request, Response } from "express";
import { getMessages } from "./methods/getMessages";
import { getAllOfUser } from "./methods/getAllOfUser";

export class ChatController {
  static getAllOfUser = async (req: Request, res: Response) =>
    getAllOfUser(req, res);

  static getMessages = async (req: Request, res: Response) =>
    getMessages(req, res);
}

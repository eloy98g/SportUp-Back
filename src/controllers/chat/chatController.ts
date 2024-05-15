import { Request, Response } from "express";
import { getMessages } from "./methods/getMessages";
import { getAllOfUser } from "./methods/getAllOfUser";
import { createMessage } from "./methods/createMessage";

export class ChatController {
  static getAllOfUser = async (req: Request, res: Response) =>
    getAllOfUser(req, res);

  static getMessages = async (req: Request, res: Response) =>
    getMessages(req, res);

  static createMessage = async (chatGid: string, message: any) =>
    createMessage(chatGid, message);
}

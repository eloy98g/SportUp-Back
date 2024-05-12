import { getAllOfUser } from "./methods/getAllOfUser";
import { getMessages } from "./methods/getMessages";

export class ChatModel {
  static getAllOfUser = async (userGid: string) => getAllOfUser(userGid);

  static getMessages = async (userGid: string) => getMessages(userGid);
}

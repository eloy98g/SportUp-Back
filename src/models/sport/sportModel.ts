import { favorite } from "./methods/favorite";
import { getAll } from "./methods/getAll";
import { unfavorite } from "./methods/unfavorite";

export class SportModel {
  static getAll = async () => getAll();

  static favorite = async (sportGid: string, userGid: string) =>
    favorite(sportGid, userGid);

  static unfavorite = async (sportGid: string, userGid: string) =>
    unfavorite(sportGid, userGid);
}

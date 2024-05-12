import { follow } from "./methods/follow";
import { getAll } from "./methods/getAll";
import { getById } from "./methods/getById";
import { getFavoriteSports } from "./methods/getFavoriteSports";
import { unfollow } from "./methods/unfollow";
import { update } from "./methods/update";

export class UserModel {
  static getById = async (id: string) => getById(id);

  static update = async (id: string, input: any) => update(id, input);

  static getAll = async (input: any) => getAll(input);

  static follow = async (userGid: string, friendGid: string) =>
    follow(userGid, friendGid);

  static unfollow = async (userGid: string, friendGid: string) =>
    unfollow(userGid, friendGid);

  static getFavoriteSports = async (userGid: string) =>
    getFavoriteSports(userGid);
}


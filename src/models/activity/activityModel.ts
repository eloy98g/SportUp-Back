import { create } from "./methods/create";
import { deleteActivity } from "./methods/delete";
import { getAll } from "./methods/getAll";
import { getById } from "./methods/getById";
import { removePlayers } from "./methods/removePlayers";
import { update } from "./methods/update";
import { updateTeams } from "./methods/updateTeams";

export class ActivityModel {
  static getAll = async (input: any) => getAll(input);

  static getById = async (gid: string) => getById(gid);

  static create = async (input: any) => create(input);

  static delete = async (gid: string) => deleteActivity(gid);

  static update = async (gid: string, input: any) => update(gid, input);

  static updateTeams = async (gid: string, input: any) =>
    updateTeams(gid, input);

  static removePlayers = async (gid: string, input: any) =>
    removePlayers(gid, input);
}

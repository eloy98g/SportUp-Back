import { getById } from "./methods/getById";
import { update } from "./methods/update";

export class UserModel {
  static getById = async (id: string) => getById(id);

  static update = async (id: string, input: any) => update(id, input);
}

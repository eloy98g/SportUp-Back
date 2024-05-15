import { create } from "./methods/create";
import { getAll } from "./methods/getAll";

export class ConfirmationModel {
  static getAll = async (input: any) => getAll(input);

  static create = async (input: any) => create(input);
}

import { create } from "./methods/create";
import { getAll } from "./methods/getAll";
import { resolve } from "./methods/resolve";

export class ApplicationModel {
  static getAll = async (input: any) => getAll(input);
  
  static create = async (input: any) => create(input);

  static resolve = async (input: any) => resolve(input);
}

import { create } from "./methods/create";
import { getAll } from "./methods/getAll";
import { resolve } from "./methods/resolve";

export class ApplicationModel {
  static getAll = async (gid:string, input: any) => getAll(gid, input);
  
  static create = async (input: any) => create(input);

  static resolve = async (input: any) => resolve(input);
}

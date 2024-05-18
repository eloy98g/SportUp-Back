import { create } from "./methods/create";
import { getAll } from "./methods/getAll";

export class ReviewModel {
  static create = async (input: any) => create(input);
  
  static getAll = async (input: any) => getAll(input);
}

import { create } from "./methods/create";

export class ReviewModel {
  static create = async (input: any) => create(input);
}

import { newUser } from "./methods/newUser";
import { signIn } from "./methods/signIn";

export class AuthModel {
  static newUser = async (input: any) => newUser(input);

  static signIn = async (input: any) => signIn(input);

  static async forgotPassword(_input: any) {}
}

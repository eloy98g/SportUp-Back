import { Request, Response } from 'express';

export class AuthController {
  static async newUser(_req:Request, res:Response) {
    res.send('hola')
  }

  static async signin(_req:Request, _res:Response) {}

  static async forgotPassword(_req:Request, _res:Response) {}
}
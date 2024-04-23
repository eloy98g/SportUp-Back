import { Response } from "express";

export class ResponseHandler {
  static handleSuccess(res: Response, data: any) {
    return res
      .status(200)
      .json({ status: "success", data: data, version: process.env.VERSION });
  }

  static handleNotFound(res: Response, errorMessage: string) {
    return res
      .status(404)
      .json({
        status: "error",
        message: errorMessage,
        version: process.env.VERSION,
      });
  }
}

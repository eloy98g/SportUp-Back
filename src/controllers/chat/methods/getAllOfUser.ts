import { Request, Response } from "express";

// Models
import { ChatModel } from "../../../models/chat/chatModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function getAllOfUser(req: Request, res: Response) {
  const { userGid } = req.query;
  const gidResult = validateGid(userGid);

  if (!gidResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(gidResult.error.errors)
    );
  }

  const result = await ChatModel.getAllOfUser(gidResult.data);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(res, result.message);
}

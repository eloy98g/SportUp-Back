import { Request, Response } from "express";

// Models
import { ChatModel } from "../../../models/chat/chatModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function getMessages(req: Request, res: Response) {
  const { id } = req.params;
  const gidResult = validateGid(id);

  if (!gidResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(gidResult.error.errors)
    );
  }

  const result = await ChatModel.getMessages(gidResult.data);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(res, result.message);
}

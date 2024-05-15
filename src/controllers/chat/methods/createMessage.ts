import { ChatModel } from "../../../models/chat/chatModel";
import { validateMessage } from "../../../schemas/chat/validateMessage";
import { validateGid } from "../../../schemas/common";
import getParsedValidationError from "../../../utils/getParsedValidationError";

export async function createMessage(chatGid: string | undefined, message: any) {
  const gidResult = validateGid(chatGid);
  const messageResult = validateMessage(message);

  if (!gidResult.success) {
    return {
      result: "error",
      message: getParsedValidationError(gidResult.error.errors),
    };
  }

  if (!messageResult.success) {
    return {
      status: "error",
      message: getParsedValidationError(messageResult.error.errors),
    };
  }

  const result = await ChatModel.createMessage(gidResult.data, message);

  if (result.result) {
    return {
      status: "sucess",
      message: "Mensaje creado correctamente",
      data: [],
    };
  } else {
    return {
      status: "error",
      ...result,
    };
  }
}

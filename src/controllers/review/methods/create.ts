import { Request, Response } from "express";

// Models
import { ReviewModel } from "../../../models/review/reviewModel";

// Schemas
import { validateReview } from "../../../schemas/review";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function create(req: Request, res: Response) {
  const validationResult = validateReview(req.body);

  if (!validationResult.success) {
    return ResponseHandler.handleNotFound(
      res,
      getParsedValidationError(validationResult.error.errors)
    );
  }

  const result = await ReviewModel.create(validationResult.data);

  if (result.result) {
    return ResponseHandler.handleSuccess(res, result.data);
  }
  return ResponseHandler.handleNotFound(
    res,
    result.message || "Error creando la solicitud."
  );
}

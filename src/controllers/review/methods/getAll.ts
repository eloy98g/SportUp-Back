import { Request, Response } from "express";

// Models
import { ReviewModel } from "../../../models/review/reviewModel";

// Schemas
import { validateGid } from "../../../schemas/common";

// Utils
import getParsedValidationError from "../../../utils/getParsedValidationError";
import { ResponseHandler } from "../../../utils/responseHandler";

export async function getAll(req: Request, res: Response) {
	// TODO: we should be able to get all reviews for an activity
	const { userGid } = req.query;
	const gidResult = validateGid(userGid);

	if (!gidResult.success) {
		return ResponseHandler.handleNotFound(
			res,
			getParsedValidationError(gidResult.error.errors)
		);
	}

	const result = await ReviewModel.getAll({ userGid: gidResult.data });

	if (result.result) {
		return ResponseHandler.handleSuccess(res, result.data);
	}
	return ResponseHandler.handleNotFound(
		res,
		result.message || "Error creando la solicitud."
	);
}

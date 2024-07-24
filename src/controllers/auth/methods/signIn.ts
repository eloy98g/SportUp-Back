import { Request, Response } from "express";

// Models
import { AuthModel } from "../../../models/auth/authModel";

// Schemas

// Utils
import { ResponseHandler } from "../../../utils/responseHandler";

export async function signIn(req: Request, res: Response) {
	const user = await AuthModel.signIn(req.body);

	if (user.result) {
		return ResponseHandler.handleSuccess(res, user.data);
	} else {
		return ResponseHandler.handleNotFound(res, user.message);
	}
}

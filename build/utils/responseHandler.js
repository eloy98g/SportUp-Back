"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static handleSuccess(res, data) {
        return res
            .status(200)
            .json({ status: "success", data: data, version: process.env.VERSION });
    }
    static handleNotFound(res, errorMessage) {
        return res
            .status(404)
            .json({
            status: "error",
            message: errorMessage,
            version: process.env.VERSION,
        });
    }
}
exports.ResponseHandler = ResponseHandler;

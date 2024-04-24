"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../models/sqlite/user");
const responseHandler_1 = require("../utils/responseHandler");
class UserController {
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_1.UserModel.getById({ id });
            if (user) {
                return responseHandler_1.ResponseHandler.handleSuccess(res, user);
            }
            return responseHandler_1.ResponseHandler.handleNotFound(res, "User not found");
        });
    }
    static getAll(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static update(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static follow(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static unfollow(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.UserController = UserController;

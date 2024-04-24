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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_1 = require("../schemas/auth");
const auth_2 = require("../models/sqlite/auth");
const responseHandler_1 = require("../utils/responseHandler");
const getPasswordHash_1 = __importDefault(require("../utils/getPasswordHash"));
class AuthController {
    static newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, auth_1.validateCredentials)(req.body);
            if (!result.success) {
                return res.status(400).json({ message: result.error.errors });
            }
            const input = {
                email: result.data.email,
                password: (0, getPasswordHash_1.default)(result.data.password),
                creationDate: Math.floor(Date.now() / 1000),
                phoneVerified: false,
                emailVerified: false,
                gender: "NS/NC",
            };
            const user = yield auth_2.AuthModel.newUser(input);
            if (user) {
                return responseHandler_1.ResponseHandler.handleSuccess(res, user);
            }
            else if (user === false) {
                return responseHandler_1.ResponseHandler.handleNotFound(res, "User already exists.");
            }
            else {
                return responseHandler_1.ResponseHandler.handleNotFound(res, "Error creating user.");
            }
        });
    }
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, auth_1.validateCredentials)(req.body);
            if (!result.success) {
                return res.status(400).json({ message: result.error.errors });
            }
            const input = {
                email: result.data.email,
                password: (0, getPasswordHash_1.default)(result.data.password),
            };
            const user = yield auth_2.AuthModel.signin(input);
            if (user) {
                return responseHandler_1.ResponseHandler.handleSuccess(res, user);
            }
            else {
                return responseHandler_1.ResponseHandler.handleNotFound(res, "Wrong email or password.");
            }
        });
    }
    static forgotPassword(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthController = AuthController;

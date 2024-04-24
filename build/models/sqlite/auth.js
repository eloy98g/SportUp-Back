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
exports.AuthModel = void 0;
const mapUser_1 = __importDefault(require("../../types/methods/mapUser"));
const dbConnection_1 = require("./dbConnection");
class AuthModel {
    static newUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, gender, emailVerified, phoneVerified, creationDate, } = input;
            const { rows: userExists } = yield dbConnection_1.connection.execute({
                sql: "SELECT * FROM USER WHERE email = ?;",
                args: [email],
            });
            if (userExists.length > 0) {
                return false;
            }
            const { rows: result } = yield dbConnection_1.connection.execute({
                sql: "INSERT INTO USER (email, password, gender, emailVerified, phoneVerified, creationDate) VALUES (?, ?, ?, ?, ?, ?) RETURNING *;",
                args: [
                    email,
                    password,
                    gender,
                    emailVerified,
                    phoneVerified,
                    creationDate,
                ],
            });
            if (result.length > 0) {
                return (0, mapUser_1.default)(result[0]);
            }
            return null;
        });
    }
    static signin(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const { rows: result } = yield dbConnection_1.connection.execute({
                sql: "SELECT * FROM USER WHERE email = ? AND password = ?;",
                args: [email, password],
            });
            if (result.length > 0) {
                return (0, mapUser_1.default)(result[0]);
            }
            return null;
        });
    }
}
exports.AuthModel = AuthModel;

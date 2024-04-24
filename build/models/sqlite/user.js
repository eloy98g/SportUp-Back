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
exports.UserModel = void 0;
const mapUser_1 = __importDefault(require("../../types/methods/mapUser"));
const dbConnection_1 = require("./dbConnection");
class UserModel {
    static getById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const { rows } = yield dbConnection_1.connection.execute({
                sql: `
        SELECT u.*, lu.*
        FROM user u
        LEFT JOIN location_user lu ON u.gid = lu.gid
        WHERE u.gid = ?;
      `,
                args: [id],
            });
            if (rows.length === 0)
                return null;
            const user = (0, mapUser_1.default)(rows[0]);
            return user;
        });
    }
}
exports.UserModel = UserModel;

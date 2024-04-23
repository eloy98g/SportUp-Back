"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const client_1 = require("@libsql/client");
require("dotenv/config");
const DEFAULT_CONFIG = {
    url: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "",
    authToken: (_b = process.env.DATABASE_TOKEN) !== null && _b !== void 0 ? _b : "",
};
const connection = await (0, client_1.createClient)(DEFAULT_CONFIG);
class ChatModel {
}
exports.ChatModel = ChatModel;

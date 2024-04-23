"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const chatController_ts_1 = require("../controllers/chatController.ts");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.get("/", chatController_ts_1.ChatController.getAll);
exports.chatRouter.get("/:id", chatController_ts_1.ChatController.getById);

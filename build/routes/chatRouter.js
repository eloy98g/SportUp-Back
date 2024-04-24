"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.get("/", chatController_1.ChatController.getAll);
exports.chatRouter.get("/:id", chatController_1.ChatController.getById);
